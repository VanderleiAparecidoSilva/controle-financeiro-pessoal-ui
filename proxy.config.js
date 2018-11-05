const proxy = [
  {
    context: '/api',
    target: 'https://controle-financeiro-pessoal.herokuapp.com',
    pathRewrite: {'^/api' : ''}
  }
];

module.exports = proxy;
