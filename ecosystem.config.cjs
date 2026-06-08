/** PM2 — portfolio on port 3002 (3000/8080/8081 often taken on shared VPS). */
const PORT = process.env.PORT || "3002";

module.exports = {
  apps: [
    {
      name: "nahndev-portfolio",
      cwd: process.env.HOME
        ? `${process.env.HOME}/nahndev-portfolio`
        : "/root/nahndev-portfolio",
      script: "node_modules/next/dist/bin/next",
      args: `start -p ${PORT}`,
      env: {
        NODE_ENV: "production",
        PORT,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};
