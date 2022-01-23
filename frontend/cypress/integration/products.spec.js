const productsCount = 48;

describe('Products', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Я могу создать продукт', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
    cy.get('button').contains('Создать').click();
    cy.get('.product-name').type('Новый тестовый продукт');
    cy.get('.product-substanceId').type('2');
    cy.get('.MuiDialog-paper').find('button').contains('Создать').click();
    cy.wait(1000);
    cy.get('.product-card').contains('Новый тестовый продукт').should('exist');
    cy.wait(1000);
  });

  it('Я могу редактировать продукт', () => {
    cy.get('.product-card').contains('Новый тестовый продукт').parents('.product-card').find('.product-card__button-group').invoke('show').find('button.edit').click();
    cy.get('.product-name').clear().type('Отредактированный тестовый продукт');
    cy.get('.product-substanceId').clear().type('10');
    cy.get('.MuiDialog-paper').find('button').contains('Сохранить').click();
    cy.wait(1000);
    cy.get('.product-card').contains('Отредактированный тестовый продукт').should('exist');
    cy.wait(1000);
  });

  it('Я могу удалить продукт', () => {
    cy.get('.product-card').contains('Отредактированный тестовый продукт').parents('.product-card').find('.product-card__button-group').invoke('show').find('button.delete').click();
    cy.wait(1000);
    cy.get('.product-card').contains('Отредактированный тестовый продукт').should('not.exist');
    cy.wait(1000);
  });

  it('Я могу просматривать продукты', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
    cy.get('.product-card').should('have.length', productsCount);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(500);
    cy.get('.product-card').should('have.length', productsCount * 2);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(500);
    cy.get('.product-card').should('have.length', productsCount * 3);
  });


});