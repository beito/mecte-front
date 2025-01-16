import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiUrl: 'http://localhost:8000/api/v1/',
  redirectionUrl: 'https://google.com/',
  serverUrl: 'http://localhost:8000',
  uploadS3URL: ``,
  downloadS3URL: ``,
};