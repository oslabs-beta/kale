describe('The Dashboard Page', () => {
  const promURL = 'http://127.0.0.1:9090/';

  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.get('#sign-in-button-homepage').click();
    cy.fixture('users/secretExistingUser.json').then((userInfo) => {
      cy.get('#email-signin').type(userInfo.email);
      cy.get('#password-signin').type(userInfo.password);
      cy.get('#signin-btn').click();
    });
    cy.get('#nav-button').click();
    cy.get('#dashboard-nav-btn').click();
  });

  it('contains /dashboard in the URL', () => {
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard');
  });
  // it('dashboard contains: Cluster URL, a line chart and a gauge chart', () => {
  // cy.contains('Cluster URL: ' + promURL);
  // cy.get('#line-chart-0').should('be.visible');
  // cy.get('#gauge-chart-0').should('be.visible');
  // });
});
