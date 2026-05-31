# Deploy on Vultr + custom domain

Guide to deploy **nahndev-portfolio** (Next.js 15) on **Vultr Cloud Compute** (Ubuntu), with **Nginx** + **Let's Encrypt** + **PM2**.

Replace `yourdomain.com` with your real domain (e.g. `nahndev.dev`).

---

## 0. Create a VPS on Vultr (first time)

### 0.1 Deploy instance

1. Sign in to the [Vultr Customer Portal](https://my.vultr.com/)
2. **Products** → **Compute** → **Deploy Server** (or **+** top right)
3. Choose configuration:

| Item | Recommendation for this project |
|------|----------------------------------|
| **Type** | Cloud Compute — Shared CPU (enough) or Regular Performance if builds are slow |
| **Location** | Singapore / Tokyo / Seoul (near Vietnam) or your preferred region |
| **Image** | **Ubuntu 24.04 LTS** x64 |
| **Plan** | **2 GB RAM / 1 vCPU** or more (`npm run build` is RAM-heavy; 1 GB may OOM) |
| **SSH Keys** | Add your public key (Mac: `cat ~/.ssh/id_ed25519.pub`) — passwordless login |
| **Server hostname** | `nahndev-portfolio` (optional) |

4. **Deploy** → wait until status is **Running** (1–2 minutes)

### 0.2 Get IP & SSH

On the instance screen:

- Copy **IP Address** (IPv4) — for DNS and SSH  
- Example: `ssh root@203.0.113.50`

Without an SSH key, Vultr sends the **root password** by email / panel (**Settings** → **View Console**).

Test SSH from your Mac:

```bash
ssh root@YOUR_VULTR_IP
```

### 0.3 Vultr Firewall Group (open ports)

Vultr has a firewall **in the panel**, separate from `ufw` on the OS — **open both** (or use one layer only, but do not forget the panel).

1. **Products** → **Network** → **Firewall** → **Add Firewall Group**
2. Name: `nahndev-web`
3. Add **Inbound** rules:

| Protocol | Port / range | Source | Notes |
|----------|----------------|--------|-------|
| TCP | 22 | `0.0.0.0/0` | SSH (narrow to your home IP later) |
| TCP | 80 | `0.0.0.0/0` | HTTP |
| TCP | 443 | `0.0.0.0/0` | HTTPS |

4. **Linked Instances** → attach the firewall to your VPS

> You do not need to expose port **3000** — Next.js listens on localhost; Nginx proxies to it.

### 0.4 (Optional) Snapshot

Before big changes: **Snapshots** → snapshot the instance for rollback.

---

## 1. Point your domain to the Vultr IP

### Domain bought on Vultr

**Products** → **DNS** → add domain → create records:

| Type | Name | Data |
|------|------|------|
| A | `@` | `YOUR_VULTR_IP` |
| A | `www` | `YOUR_VULTR_IP` |

### Domain elsewhere (Namecheap, Cloudflare, …)

At the registrar, update nameservers or DNS only:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `YOUR_VULTR_IP` |
| A | `www` | `YOUR_VULTR_IP` |

**Cloudflare:** turn off proxy (grey cloud) the first time you run Certbot, or use Cloudflare SSL separately.

Verify:

```bash
dig +short yourdomain.com
dig +short www.yourdomain.com
```

Both must return your **Vultr IP**.

---

## 2. Server setup on Vultr

SSH as `root@YOUR_VULTR_IP`:

### 2.1 Update + required packages

```bash
apt update && apt upgrade -y
apt install -y curl git nginx certbot python3-certbot-nginx ufw
```

### 2.2 UFW (Ubuntu firewall)

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

### 2.3 Node.js 22 (project requires Node ≥ 20)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v
npm -v
```

### 2.4 PM2

```bash
npm install -g pm2
```

### 2.5 `deploy` user (do not run the app as root)

```bash
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
```

Copy SSH key for deploy (if using keys):

```bash
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Then:

```bash
ssh deploy@YOUR_VULTR_IP
```

App directory: `/home/deploy/nahndev-portfolio`.

---

## 3. Get code onto Vultr

### Option A — Git (recommended)

As user `deploy`:

```bash
cd ~
git clone https://github.com/thanhnhan20298/nahndev-portfolio.git
cd nahndev-portfolio
```

Private repo: add a [Deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) on GitHub and use it on the VPS.

### Option B — rsync from Mac

```bash
cd /Users/mac/Documents/Projects/nahndev-portfolio
rsync -avz --exclude node_modules --exclude .next --exclude .git \
  ./ deploy@YOUR_VULTR_IP:~/nahndev-portfolio/
```

---

## 4. Build & PM2

```bash
cd ~/nahndev-portfolio
npm ci
npm run build
```

[`ecosystem.config.cjs`](../ecosystem.config.cjs) is included — verify `cwd`:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
# Run the sudo command PM2 prints (copy/paste), then:
pm2 save
pm2 status
```

Test locally on the VPS:

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000
# Expected: 200
```

---

## 5. Nginx

```bash
sudo nano /etc/nginx/sites-available/nahndev
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -sf /etc/nginx/sites-available/nahndev /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Open `http://yourdomain.com` or `http://YOUR_VULTR_IP` — site should load (no HTTPS yet).

---

## 6. HTTPS (Certbot)

DNS must point to the Vultr IP before running:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Choose **redirect HTTP → HTTPS**.

```bash
sudo certbot renew --dry-run
```

---

## 7. Redeploy (after code changes)

```bash
cd ~/nahndev-portfolio
git pull
npm ci
npm run build
pm2 restart nahndev-portfolio
```

---

## 8. Vultr + domain checklist

- [ ] Instance **Running**, plan ≥ 2 GB RAM
- [ ] **Vultr Firewall**: 22, 80, 443 → linked to instance
- [ ] **UFW**: Nginx Full enabled
- [ ] DNS A `@` + `www` → Vultr IP
- [ ] `pm2 status` → online
- [ ] `https://yourdomain.com` OK
- [ ] `https://yourdomain.com/projects/manga-portfolio` OK

---

## 9. Common Vultr issues

### Cannot SSH

- Instance not **Running**
- Vultr Firewall missing TCP 22
- Wrong IP (IPv4, not IPv6-only)

### Website timeout

- Vultr Firewall missing 80/443
- `ufw` not allowing Nginx
- DNS not pointing to the correct IP

### `npm run build` killed (OOM)

On a 1 GB plan — upgrade to **2 GB** on Vultr (**Upgrade** instance) or add swap:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### 502 Bad Gateway

```bash
pm2 logs nahndev-portfolio
sudo nginx -t
curl -I http://127.0.0.1:3000
```

### Certbot fails

- Domain not pointing to Vultr IP yet (wait for DNS)
- Cloudflare proxy enabled (disable temporarily or use DNS-only)

### WebGL / gunshot audio

Requires **HTTPS** on a real domain (not IP-only).

---

## 10. Environment variables (optional)

```bash
# ~/nahndev-portfolio/.env.production
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Add `env_file: ".env.production"` in `ecosystem.config.cjs` if needed.

---

## Diagram

```text
yourdomain.com (DNS A → Vultr IP)
        ↓
Vultr Firewall :80/:443
        ↓
Ubuntu ufw → Nginx :443
        ↓
127.0.0.1:3000 ← PM2 ← next start
```

**Useful Vultr panel:** Bandwidth graph, Reboot, View Console (KVM), Resize if low on RAM.

If something breaks, include Vultr IP, domain, `pm2 logs` output, and `sudo nginx -t`.
