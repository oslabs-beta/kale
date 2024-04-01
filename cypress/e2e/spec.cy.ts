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
});

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
