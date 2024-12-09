/// <reference types="cypress" />



describe('user journey from homepage', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })


  it('Should add an entry to the table once fields are added with additionalFields empty', () => {
    cy.get('[data-cy="name"]').type("John Doe")
    cy.get('[data-cy="email"]').type("johndoe@gmail.com")
    cy.get('[data-cy="age"]').type("23")
    cy.get('[data-cy="add_entry"]').click()
    cy.get('[data-cy="delete_entry_0"]').should('have.length', 1)
    cy.get('[data-cy="see_fields_0"]').should('have.length', 0)
  })

  it('Delete an entry removes it from the table', () => {
    cy.get('[data-cy="name"]').type("John Doe")
    cy.get('[data-cy="email"]').type("johndoe@gmail.com")
    cy.get('[data-cy="age"]').type("23")
    cy.get('[data-cy="add_entry"]').click()

    cy.get('[data-cy="name"]').type("Jane Doe")
    cy.get('[data-cy="email"]').type("janedoe@gmail.com")
    cy.get('[data-cy="age"]').type("25")
    cy.get('[data-cy="add_entry"]').click()

    cy.get('[data-cy="name"]').type("Professor X")
    cy.get('[data-cy="email"]').type("xavier@xmen.com")
    cy.get('[data-cy="age"]').type("70")
    cy.get('[data-cy="add_entry"]').click()

    
    cy.get('[data-cy="edit_name_John Doe"]').should('have.length', 1)
    cy.get('[data-cy="delete_entry_0"]').should('have.length', 1)
    cy.get('[data-cy="delete_entry_0"]').click()

    cy.get('[data-cy="edit_name_John Doe"]').should('have.length', 0)
  })

  it('Error message shows for negative age', () => {
    cy.get('[data-cy="name"]').type("John Doe")
    cy.get('[data-cy="email"]').type("johndoe@gmail.com")
    cy.get('[data-cy="age"]').type("-23")
    cy.get('[data-cy="add_entry"]').click()

    cy.wait(200)

    cy.get('[data-cy="error_message"]').should('have.length', 1)
    
  })

  it('Entries can be edited and will show error for 3 seconds if not valid', () => {
    cy.get('[data-cy="name"]').type("John Doe")
    cy.get('[data-cy="email"]').type("johndoe@gmail.com")
    cy.get('[data-cy="age"]').type("23")
    cy.get('[data-cy="add_entry"]').click()


    cy.get('[data-cy="edit_email_johndoe@gmail.com"]').click()
    cy.get('[data-cy="input_email_johndoe@gmail.com"]').focus().clear()
    cy.get('[data-cy="input_email_johndoe@gmail.com"]').type("johndoe20@gmail.com")
    cy.get('[data-cy="input_email_johndoe@gmail.com"]').type("{enter}")

    cy.get('[data-cy="edit_email_johndoe20@gmail.com"]').should('have.length', 1)

    cy.get('[data-cy="edit_age_23"]').click()
    cy.get('[data-cy="input_age_23"]').focus().clear()
    cy.get('[data-cy="input_age_23"]').type("-23")
    cy.get('[data-cy="input_age_23"]').type("{enter}")
    cy.get('[data-cy="error_age_23"]').should('have.length', 1)

    cy.wait(4000)
    cy.get('[data-cy="error_age_23"]').should('have.length', 0)
  })

  it('Additional fields can be added to the initial form or removed and will appear under additionalFields as editable entries', () => {
    cy.get('[data-cy="name"]').type("John Doe")
    cy.get('[data-cy="email"]').type("johndoe@gmail.com")
    cy.get('[data-cy="age"]').type("23")
    cy.get('[data-cy="input_add_field"]').type("Favorite Food")
    cy.get('[data-cy="add_field"]').click()
    cy.get('[data-cy="input_add_field"]').type("Favorite Movie")
    cy.get('[data-cy="add_field"]').click()

    

    cy.get('[data-cy="input_Favorite Food"]').should('have.length', 1)
    cy.get('[data-cy="input_Favorite Movie"]').should('have.length', 1)

    cy.get('[data-cy="input_Favorite Food"]').type("Pizza")
    cy.get('[data-cy="input_Favorite Movie"]').type("The Matrix")
    
    cy.get('[data-cy="add_entry"]').click()

    //edit entry
    cy.get('[data-cy="see_fields_0"]').click()
    cy.get('[data-cy="edit_Favorite Food_Pizza"]').should('have.length', 1)
    cy.get('[data-cy="edit_Favorite Food_Pizza"]').click()
    cy.get('[data-cy="input_Favorite Food_Pizza"]').focus().clear()
    cy.get('[data-cy="input_Favorite Food_Pizza"]').type("Pasta")
    cy.get('[data-cy="input_Favorite Food_Pizza"]').type("{enter}")
    cy.get('[data-cy="edit_Favorite Food_Pizza"]').should('have.length', 0)
    cy.get('[data-cy="edit_Favorite Food_Pasta"]').should('have.length', 1)
  })
})
