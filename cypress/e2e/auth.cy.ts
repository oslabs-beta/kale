describe('Authentication', () => {
  const userInfo = {
    firstName: 'Cypress',
    email: 'cypress@kale.kale',
    password: 'Cypress1234!',
  };

  describe('Signup', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
      cy.get('#nav-button').click();
      cy.get('#signup-nav-btn').click();
    });
    it('signup form is visible', () => {
      cy.get('#signup-form').should('be.visible');
    });
    it('create account', () => {
      cy.get('#first-name-signup').type(userInfo.firstName);
      cy.get('#email-signup').type(userInfo.email);
      cy.get('#password-signup').type(userInfo.password);
      cy.get('#confirm-password-signup').type(userInfo.password);
      cy.get('#create-account-btn').click();
    });
  });

  describe('Signin', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
      cy.get('#nav-button').click();
      cy.get('#signup-nav-btn').click();
    });
    it('signin form is visible', () => {
      cy.visit('http://localhost:8080/signin');
      cy.get('#signin-form').should('be.visible');
    });
  });
});
