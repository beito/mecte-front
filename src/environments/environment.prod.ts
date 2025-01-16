import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://mecte.dev/api',
  redirectionUrl: 'https://google.com/',
  serverUrl: 'https://mecte.dev',
  uploadS3URL: `https://52iff4ri2sfqvuxf6s3xnyca5e0ydujq.lambda-url.us-east-1.on.aws`,
  downloadS3URL: `https://zgh5a4bksjlzukmhfc6qensmsm0fanml.lambda-url.us-east-1.on.aws`,
};
