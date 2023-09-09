// Cypress E2E Test
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should navigate to the CS page from the Home Page', () => {

    // We should expect to see Home Text since we are in home page
    cy.get('h1').contains('Home')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="/cs"]').click()

    // The new url should include "/cs"
    cy.url().should('include', '/cs')

    // The new page should contain a label with "PLACE YOUR GUESS"
    cy.get('label').contains('PLACE YOUR GUESS:')
  })
})