import { expect } from 'chai';

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://localhost:8080');
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');
    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com');

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com');
  });
});
