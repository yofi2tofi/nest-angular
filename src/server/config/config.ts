import { normalize, join } from 'path';

interface IEnvironmentConfig {
  rootPath: string;
  db: string;
  httpPort: number;
  wsPort: number;
  jwtSecret: string;
  sessionSecret: string;
  domain: string;
  httpProtocol: string;
  wsProtocol: string;
}

interface IConfig {
  [key: string]: IEnvironmentConfig;
  development: IEnvironmentConfig;
  production: IEnvironmentConfig;
}

const rootPath = process.cwd();

const Config: IConfig = {
  development: {
    rootPath,
    db: 'mongodb://localhost:27017/store',
    httpPort: 1337,
    wsPort: 1338,
    jwtSecret: 'secret',
    sessionSecret: 'secret',
    domain: 'localhost',
    httpProtocol: 'http',
    wsProtocol: 'ws'
  },
  production: {
    rootPath,
    db: process.env.MONGODB_CONNECTION,
    httpPort: +process.env.HTTP_SERVER_PORT,
    wsPort: +process.env.WS_PORT,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    domain: process.env.DOMAIN,
    httpProtocol: process.env.HTTP_PROTOCOL,
    wsProtocol: process.env.WS_PROTOCOL
  }
};

export {
  IEnvironmentConfig,
  IConfig,
  Config
};
