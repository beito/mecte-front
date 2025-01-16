import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://mecte-bd387e359353.herokuapp.com/api/v1/',
  redirectionUrl: 'https://google.com/',
  serverUrl: 'https://mecte-bd387e359353.herokuapp.com',
  uploadS3URL: ``,
  downloadS3URL: ``,
};
