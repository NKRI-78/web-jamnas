module.exports = {
  apps: [
    {
      name: "web-jamnas-htci",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3335,
      },
    },
  ],
};
  