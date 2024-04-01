describe('The Dashboard Page', () => {
  const promURL = 'http://127.0.0.1:9090/';

  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.contains('Get started').click();

    cy.get('#url-input').type(promURL);
    cy.get('#go-button').click();
  });

  it('contains /dashboard in the URL', () => {
    cy.url().should('include', '/dashboard');
  });
  it('dashboard contains: Cluster URL, a line chart and a gauge chart', () => {
    cy.contains('Dashboard');
    cy.contains('Cluster URL: ' + promURL);
    cy.get('#line-chart-0').should('be.visible');
    cy.get('#gauge-chart-0').should('be.visible');
  });
});
