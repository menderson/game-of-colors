import path from 'path';

module.exports = {

  development: {
    connection: {
      host: "ec2-34-193-117-204.compute-1.amazonaws.com",
      database: "dd15067tv78kvu",
      user: "fvgsdfitpypunk",
      password: "a2eb20276cc84a4f07506f1ba7a80c4168733d2b5233455124dda8cef07c9159",
      ssl: false
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
  },

  staging: {
    connection: {
      host: "ec2-34-193-117-204.compute-1.amazonaws.com",
      database: "dd15067tv78kvu",
      user: "fvgsdfitpypunk",
      password: "a2eb20276cc84a4f07506f1ba7a80c4168733d2b5233455124dda8cef07c9159",
      ssl: false
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
  },

  production: {
    connection: {
      host: "ec2-34-193-117-204.compute-1.amazonaws.com",
      database: "dd15067tv78kvu",
      user: "fvgsdfitpypunk",
      password: "a2eb20276cc84a4f07506f1ba7a80c4168733d2b5233455124dda8cef07c9159",
      ssl: false
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
  }

};
