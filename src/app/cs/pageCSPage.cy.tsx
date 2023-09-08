import React from 'react'
import CSPage from './page'

describe('<CSPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CSPage />)
  })
})