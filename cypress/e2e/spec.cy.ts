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

  // New test to check for an empty input submission
  it('should display an error message when submitting with empty input', () => {
    // Navigate to the CS page as in the previous test
    cy.get('a[href*="/cs"]').click()

    // Ensure we are on the correct page by checking for the label "PLACE YOUR GUESS:"
    cy.get('label').contains('PLACE YOUR GUESS:')

    // Click the submit button without entering any text
    cy.get('button').contains('Submit').click()

    // Check if the warning message appears for empty input
    cy.get('p').contains('Please enter a guess!').should('be.visible')
  })

  // New test to check for an invalid answer submission
  it('should display an error message for an invalid answer submission', () => {
    // Navigate to the CS page as in the previous test
    cy.get('a[href*="/cs"]').click()

    // Ensure we are on the correct page by checking for the label "PLACE YOUR GUESS:"
    cy.get('label').contains('PLACE YOUR GUESS:')

    // Enter an invalid answer 'A' in the input field
    cy.get('input#userInput').type('A')

    // Unfocus the input to close the suggestion list
    cy.get('input#userInput').blur()

    // Click the submit button
    cy.get('button').contains('Submit').click()

    // Check if the invalid answer warning message appears
    cy.get('p').contains('Invalid answer! Please choose from the list.').should('be.visible')
  })  
})