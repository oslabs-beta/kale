describe('The History Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/history');
    cy.get('#nav-button').click();
    cy.get('#history-nav-btn').click();
  });

  it('contains /history in the URL and a title "History"', () => {
    cy.url().should('include', '/history');
    cy.contains('History');
  });
});
