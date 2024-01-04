module.exports = {
  apps : [
    {
      name: "sys-medical-web",
      script: "node_modules/next/dist/bin/next",
      args: 'start',
      env_development: {
        "NODE_ENV": "development"
      },
      env_production: {
        "NODE_ENV": "production",
      }
    }
  ]
}