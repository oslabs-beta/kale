import { expect } from 'chai';

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('has a title', () => {
    cy.contains('Welcome to kale').click();
    cy.get('#url-input').type('http://127.0.0.1:8081/');
    cy.get('#url-input').should('have.value', 'http://127.0.0.1:8081/');

    // cy.url().should('include', '/commands/actions');
    // // Get an input, type into it

    // //  Verify that the value has been updated
  });
  it('has a "Get starteg" button and input field shows up when clicked', () => {
    cy.contains('Get started').click();
    cy.get('#url-input').should('be.visible');
  });
});
