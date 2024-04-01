import { expect } from 'chai';

describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('has a title', () => {
    cy.contains('Welcome to kale').click();

    // cy.url().should('include', '/commands/actions');
  });
});

describe('The Welcome Page', () => {
  const promURL = 'http://127.0.0.1:9090/';

  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('has a title', () => {
    cy.contains('Welcome');
  });
  it('has a "Get started" button and input field shows up when clicked', () => {
    cy.contains('Get started').click();
    cy.get('#url-input').should('be.visible');

    cy.get('#url-input').type(promURL);
    cy.get('#url-input').should('have.value', promURL);
  });
  it('has a sidebar that opens and closes', () => {
    cy.get('#nav-button').click();
    cy.get('#drawer-navigation').should('be.visible');

    cy.get('#nav-close-button').click();
    cy.get('#drawer-navigation').should('not.be.visible');
  });
  it('dashboard button in sidebar redirects to /dashboard', () => {
    cy.get('#nav-button').click();
    cy.get('#dashboard-btn').click();
    cy.url().should('include', '/dashboard');
  });
  it('dashboard button in sidebar redirects to /history', () => {
    cy.get('#nav-button').click();
    cy.get('#history-btn').click();
    cy.url().should('include', '/history');
  });
});
