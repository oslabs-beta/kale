describe('The History Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.get('#sign-in-button-homepage').click();
    cy.fixture('users/secretExistingUser.json').then((userInfo) => {
      cy.get('#email-signin').type(userInfo.email);
      cy.get('#password-signin').type(userInfo.password);
      cy.get('#signin-btn').click();
    });
    cy.get('#nav-button').click();
    cy.get('#history-nav-btn').click();
  });

  it('contains /history in the URL and a title "History"', () => {
    cy.url().should('include', '/history');
    cy.contains('History');
  });
});
