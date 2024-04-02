describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('has a title', () => {
    cy.contains('Welcome to kale').click();

    // cy.url().should('include', '/commands/actions');
  });
});
