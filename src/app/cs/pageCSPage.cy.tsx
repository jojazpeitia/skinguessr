import React from 'react'
import CSPage from './page'

// currently have CS page as 1 big component
// planning on splitting it up in the future for better component testing
describe('<CSPage />', () => {
  it('renders', () => {

    // Mount the React component
    cy.mount(<CSPage />)
  })
})