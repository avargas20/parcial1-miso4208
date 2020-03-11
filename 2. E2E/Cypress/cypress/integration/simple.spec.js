describe('SignIn', function() {
    it('Successful registry', function() {
        cy.visit('https://todoist.com/es/')
        cy.contains('Registrarse').click()
        cy.wait(2000)
        cy.get('form').find('input[name="full_name"]').click().type("avargas20")
        cy.get('form').find('input[name="email"]').click().type("vargaspintoadriana@gmail.com")
        cy.get('form').find('input[name="pwd"]').click().type("123456f")
        cy.get('.accept_terms').click()
        cy.get('.submit_button').click()
    })
})


describe('Todoist login success', function() {
    it('Visits Todoist and success at login', function() {
        cy.visit('https://todoist.com/Users/showLogin?mini=1')
      	cy.get('form').find('input[name="email"]').click().type("vargaspintoadriana@gmail.com")
      	cy.get('form').find('input[name="password"]').click().type("123456f")
		cy.screenshot();
      	cy.get('form').contains('Log').click()
		cy.get('span[id="gear_holder"]').click().should('to.exist')
		cy.screenshot();
    })
})
