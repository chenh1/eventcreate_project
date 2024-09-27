/// <reference types="cypress" />

import { 
  host,
  mockAcc1,
  mockAcc1Pw,
  mockAcc2,
  mockAcc2Pw,
  mockAcc3,
  mockAcc3Pw,
  dashboard,
  path
} from "../constants"

describe('user journey from homepage', () => {
  beforeEach(() => {
    cy.visit(host)
  })

  it('first time user visiting homepage', () => {
    cy.get('[data-cy="hero-cta"]').should('have.length', 1)
    cy.get('[data-cy="hero-cta"]').click()
    cy.wait(1000)

    // Should be redirected to path page
    cy.location().should((location) => {
      expect(location.pathname).to.eq(path)
    })
    
    cy.get('[data-cy="path-questionnaire-answer-0"]').click()
    cy.wait(300)
    cy.get('[data-cy="path-questionnaire-answer-2"]').click()
    cy.wait(300)
    cy.get('[data-cy="path-questionnaire-answer-1"]').click()
    cy.wait(300)
    cy.get('[data-cy="path-questionnaire-answer-0"]').click()

    cy.wait(1000)
    // Should see path generated from questionnaire
    cy.location().should((location) => {
      expect(location.search).to.include('q1=a&q2=c&q3=b&q4=a')
    })
    cy.get('[data-cy="current-path-root-text"]').should('have.text', "Your steps to success")
    cy.get('[data-cy="log-in-prompt-learning-path"]').should('have.length', 1)

    cy.get('[data-cy="current-path-node-1"]').click()

    cy.wait(1000)
    // Login warning on video if not logged in
    cy.get('[data-cy="video-login-warning"]').should('have.length', 1)
  })

  it('logged in user visiting dashboard with no path data', () => {
    cy.get('[data-cy="header-login-link"]').should('have.length', 1)
    cy.get('[data-cy="header-login-link"]').click()
    cy.wait(200)

    cy.get('[data-cy="login-email-field"]').type(mockAcc1)
    cy.get('[data-cy="login-password-field"]').type(mockAcc1Pw)
    cy.get('[data-cy="login-register-cta"]').click()

    cy.wait(100)
    cy.get('[data-cy="nav-link-dashboard"]').click()    

    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq(dashboard)
    })

    cy.get('[data-cy="tailor-lesson-button"]').should('have.length', 1)
    cy.get('[data-cy="start-from-top-button"]').should('have.length', 1)
  })

  it('logged in user visiting dashboard with all path set', () => {
    cy.get('[data-cy="header-login-link"]').should('have.length', 1)
    cy.get('[data-cy="header-login-link"]').click()
    cy.wait(200)

    cy.get('[data-cy="login-email-field"]').type(mockAcc2)
    cy.get('[data-cy="login-password-field"]').type(mockAcc2Pw)
    cy.get('[data-cy="login-register-cta"]').click()

    cy.wait(100)
    cy.get('[data-cy="nav-link-dashboard"]').click()    

    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq(dashboard)
    })
    
    cy.get('[data-cy="tailor-lesson-button"]').should('have.length', 0)
    cy.get('[data-cy="start-from-top-button"]').should('have.length', 0)
    cy.get('[data-cy="current-path-root-text"]').should('have.length', 0)
    cy.get('[data-cy="pick-up-left-off-text"]').should('have.length', 1)
    cy.get('[data-cy="pick-up-left-off-text"]').should('have.text', "Pick up where you left off")
  })

  it('logged in user visiting dashboard with custom path set and never visited a module', () => {
    cy.get('[data-cy="header-login-link"]').should('have.length', 1)
    cy.get('[data-cy="header-login-link"]').click()
    cy.wait(200)

    cy.get('[data-cy="login-email-field"]').type(mockAcc3)
    cy.get('[data-cy="login-password-field"]').type(mockAcc3Pw)
    cy.get('[data-cy="login-register-cta"]').click()

    cy.wait(100)
    cy.get('[data-cy="nav-link-dashboard"]').click()    

    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq(dashboard)
    })
    
    cy.get('[data-cy="tailor-lesson-button"]').should('have.length', 0)
    cy.get('[data-cy="start-from-top-button"]').should('have.length', 0)
    cy.get('[data-cy="current-path-root-text"]').should('have.length', 1)
    cy.get('[data-cy="pick-up-left-off-text"]').should('have.length', 1)
    cy.get('[data-cy="pick-up-left-off-text"]').should('have.text', "Start your learning journey")
  })
})
