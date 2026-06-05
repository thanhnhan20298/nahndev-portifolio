/** PM2 — set `cwd` to the app path on your server. */
module.exports = {
  apps: [
    {
      name: "nahndev-portfolio",
      cwd: process.env.HOME
        ? `${process.env.HOME}/nahndev-portfolio`
        : "/home/deploy/nahndev-portfolio",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};
