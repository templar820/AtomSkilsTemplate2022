const CYPRESS_EMAIL = 'cypress@test';
const CYPRESS_PASSWORD = '1';

describe('Auth', () => {

  it('Я могу войти', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type=email]').type(CYPRESS_EMAIL);
    cy.get('input[type=password]').type(CYPRESS_PASSWORD);
    cy.wait(1000);
    cy.get('button').contains('Войти').click();
  });

  it('Я могу выйти', () => {
    cy.wait(2000);
    cy.get('button').contains(CYPRESS_EMAIL).click();
    cy.get('a[role=button]').contains('Выйти').click();
  });
});