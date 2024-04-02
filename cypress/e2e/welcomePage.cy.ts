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
});
