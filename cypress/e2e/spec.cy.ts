// Cypress E2E Test
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should navigate to the CS page from the Home Page', () => {

    // We should expect to see the 'Get 3 chances to' Text since we are in home page
    cy.get('h1').contains('Get 3 chances to')

    // Find a link with an href attribute containing "cs" and click it
    cy.get('a[href*="/cs"]').click()

    // The new url should include "/cs"
    cy.url().should('include', '/cs')

    // The new page should contain a label with "PLACE YOUR GUESS"
    cy.get('label').contains('PLACE YOUR GUESS:')
  })
})