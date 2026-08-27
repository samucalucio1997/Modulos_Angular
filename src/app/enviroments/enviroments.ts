export const environment = {
  production: false,
  hmr: false,
  coreApiUrl: "http://localhost:8082",
  rateioApiUrl: "http://localhost:8081",
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'ecommerce',
    clientId: 'angular-frontend',
    adminClientId: 'admin-cli',
    adminClientSecret: 'CHANGE_ME'
  }
};