describe('The Splash Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('has a title', () => {
    cy.contains('Welcome to kale');
    cy.contains('Sign in');
    cy.contains('Sign up');
  });
});
