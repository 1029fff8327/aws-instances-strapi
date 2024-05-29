module.exports = {
  apps: [
    {
      name: 'strapi', // Your project name
      cwd: '/home/ec2-user/strapi-2', // Path to your project
      script: 'npm', // For this example we're using npm, could also be yarn 
      args: 'start', // Script to start the Strapi server, `start` by default
      env: {

      },
    },
  ],
};
