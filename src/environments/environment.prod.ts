export const environment = {
  production: true,
  apiUrl: 'https://controle-financeiro-pessoal.herokuapp.com',
  bucketApiUrl: 'https://s3-sa-east-1.amazonaws.com/controle-financeiro-pessoal/',
  photoPrefix: 'up_',
  defaultTitle: 'Controle Financeiro - By Vanderlei',
  childTitle: 'CF - ',
  tokenWhitelistedDomains: [ new RegExp('controle-financeiro-pessoal.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
