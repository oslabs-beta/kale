describe('Authentication', () => {
  describe('Signup', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
    });
    it('signup form is visible', () => {
      cy.get('#sign-up-button-homepage').click();
      cy.get('#signup-form').should('be.visible');
    });
    it('successful create account', () => {
      cy.get('#sign-up-button-homepage').click();
      cy.fixture('users/secretUser.json').then((userInfo) => {
        cy.intercept('POST', '/user/signup').as('createUser');

        cy.get('#first-name-signup').type(userInfo.firstName);
        cy.get('#email-signup').type(userInfo.email);
        cy.get('#password-signup').type(userInfo.password);
        cy.get('#confirm-password-signup').type(userInfo.password);
        cy.get('#create-account-btn').click();

        cy.wait('@createUser').then((interception) => {
          expect(interception.response.body).to.have.property(
            'email',
            userInfo.email
          );
          expect(interception.response.body).to.have.property(
            'firstName',
            userInfo.firstName
          );
          expect(interception.response.statusCode).to.equal(200);
        });
      });
    });
    it('create account with existing email address', () => {
      cy.get('#sign-up-button-homepage').click();
      cy.fixture('users/secretUser.json').then((userInfo) => {
        cy.intercept('POST', '/user/signup').as('createUser');

        cy.get('#first-name-signup').type(userInfo.firstName);
        cy.get('#email-signup').type(userInfo.email);
        cy.get('#password-signup').type(userInfo.password);
        cy.get('#confirm-password-signup').type(userInfo.password);
        cy.get('#create-account-btn').click();

        cy.wait('@createUser').then((interception) => {
          expect(interception.response.body).to.include(
            'Username already exists. Please choose another username'
          );
          expect(interception.response.statusCode).to.equal(400);
        });
      });
    });
    it('Already have an account? Sign in', () => {
      cy.get('#sign-up-button-homepage').click();
      cy.contains('Login').click();
      cy.url().should('include', '/signin');
    });
  });

  describe('Signin', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
      cy.get('#sign-up-button-homepage').click();
      cy.get('#nav-button').click();
      cy.get('#signin-nav-btn').click();
    });
    it('signin form is visible', () => {
      cy.get('#signin-form').should('be.visible');
    });
    it('successful signin', () => {
      cy.fixture('users/secretUser.json').then((userInfo) => {
        cy.intercept('POST', '/user/login').as('signinUser');

        cy.get('#email-signin').type(userInfo.email);
        cy.get('#password-signin').type(userInfo.password);
        cy.get('#signin-btn').click();

        cy.wait('@signinUser').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
      });
    });
    it('unsuccessful signin', () => {
      cy.fixture('users/secretUser.json').then((userInfo) => {
        cy.intercept('POST', '/user/login').as('signinUser');

        cy.get('#email-signin').type(userInfo.email);
        cy.get('#password-signin').type('wrongpassword');
        cy.get('#signin-btn').click();

        cy.wait('@signinUser').then((interception) => {
          expect(interception.response.body).to.include(
            'Invalid login credentials.'
          );
          expect(interception.response.statusCode).to.equal(401);
        });
      });
    });
    it('Not registered yet? Create account', () => {
      cy.contains('Create account').click();
      cy.url().should('include', '/signup');
    });
  });
});
