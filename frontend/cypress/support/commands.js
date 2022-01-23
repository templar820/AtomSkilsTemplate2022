
const CYPRESS_EMAIL = 'cypress@test';
const CYPRESS_PASSWORD = '1';

Cypress.Commands.add('login', () => {
  cy.request('POST', 'http://localhost:8080/api/user/login', {email: CYPRESS_EMAIL, password: CYPRESS_PASSWORD}).then(response => {
    const token = response.body.data.token;
    localStorage.setItem('token', token);
    console.log();
  });
  //
  // cy.visit('http://localhost:3000/');
  // cy.get('input[type=email]').type(CYPRESS_EMAIL);
  // cy.get('input[type=password]').type(CYPRESS_PASSWORD);
  // cy.get('button').contains('Войти').click();
});

// Cypress.Commands.add('logout', () => {
//   cy.visit('http://localhost:3000/');
//   cy.get('button').contains(CYPRESS_EMAIL).click();
//   cy.get('a[role=button]').contains('Выйти').click();
// });

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});