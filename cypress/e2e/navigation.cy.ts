/// <reference types="cypress" />

describe('The Welcome Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/dashboard');
  });

  it('has a sidebar that opens and closes', () => {
    cy.get('#nav-button').click();
    cy.get('#drawer-navigation').should('be.visible');

    cy.get('#nav-close-button').click();
    cy.get('#drawer-navigation').should('not.be.visible');
  });

  it('dashboard sidebar button redirects to /dashboard', () => {
    cy.get('#nav-button').click();
    cy.get('#dashboard-nav-btn').click();
    cy.url().should('include', '/dashboard');
  });
  it('history sidebar button redirects to /history', () => {
    cy.get('#nav-button').click();
    cy.get('#history-nav-btn').click();
    cy.url().should('include', '/history');
  });
  it('signup sidebar button redirects to /signup', () => {
    cy.get('#nav-button').click();
    cy.get('#signup-nav-btn').click();
    cy.url().should('include', '/signup');
  });
  it('signin sidebar button redirects to /signin', () => {
    cy.get('#nav-button').click();
    cy.get('#signin-nav-btn').click();
    cy.url().should('include', '/signin');
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    cy.get('#nav-button').click();
    cy.get('#history-nav-btn').click();
    cy.url().should('include', '/history');

    cy.go('back');
    cy.url().should('not.include', 'navigation');

    cy.go('forward');
    cy.url().should('include', '/history');
  });

  it('cy.reload() - reload the page', () => {
    cy.get('#nav-button').click();
    cy.get('#history-nav-btn').click();
    cy.url().should('include', '/history');

    cy.reload();

    cy.reload(true);
  });
});
