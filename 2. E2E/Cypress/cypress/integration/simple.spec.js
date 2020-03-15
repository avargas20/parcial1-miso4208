describe('Test login', function() {
    it('Successful login', function() {
        cy.visit('https://todoist.com/Users/showLogin?mini=1')
      	cy.get('form').find('input[name="email"]').click().type('vargaspintoadriana@gmail.com')
        cy.get('form').find('input[name="password"]').click().type('12345678')
        cy.wait(2000)
        cy.screenshot();
        cy.get('form').contains('Log').click()
		cy.get('span[id="gear_holder"]').click().should('to.exist')
		cy.screenshot();
    })
    it('Login failed', function() {
        cy.visit('https://todoist.com/Users/showLogin?mini=1')
      	cy.get('form').find('input[name="email"]').click().type('vargaspintoadriana')
        cy.get('form').find('input[name="password"]').click().type('12345678_fail')
        cy.wait(2000)
        cy.screenshot();
        cy.get('form').contains('Log').click()
		cy.screenshot();
    })
})

describe('Test project', function() {	
    it('New project', function() {
        cy.visit('https://todoist.com/Users/showLogin?mini=1')
      	cy.get('form').find('input[name="email"]').click().type('vargaspintoadriana@gmail.com')
      	cy.get('form').find('input[name="password"]').click().type('12345678')
      	cy.get('form').contains('Log').click()
        cy.get('div[id="left_menu"]').find('button[data-track="navigation|projects_quick_add"]').click()
        cy.get('form').find('input[id="edit_project_modal_field_name"]').click().type('Nuevo proyecto')
        cy.get('form').find('button[class="color_dropdown_toggle form_field_control"]').click()
        cy.get('div[id="dropdown-select-3-popup"]').find('li[id="dropdown-select-3-option-44"]').click()
        cy.screenshot();
        cy.get('form').find('div[class="form_field form_field_inline"]').click()
        cy.get('form').find('button[class="ist_button ist_button_red"]').click()
        cy.get('.left_menu').contains('Nuevo proyecto')
        cy.screenshot();
    })
    it('New task', function() {
		cy.get('.task_actions').find('a').click()
		cy.get('.DraftEditor-root').find('br').type(' ', {force: true})
		cy.get('span[data-text="true"]').click().type('Nueva tarea')
		cy.screenshot();
		cy.get('button[type="submit"]').click()
		cy.screenshot();
    })
    it('New task with special characters', function() {
		cy.get('.item_editor_details').click().type('·%$&G&(/()$"GFJ·%$&G&(/()$"GFJKYdfdGJDNñp*¿?=()/&$$$_:;!|@KYdfdGJDNñp*¿?=()/&$$$_:·%$&G&(/()$"GFJKYdfdGJDNñp*¿?=()/&$$$_:;!|@;!|@·%$&G&(/()$"GFJK·%$&G&(/()$"GFJKYdfdGJDNñp*¿?=()/&$$$_:;!|@YdfdGJDNñp*¿?=()/&$$$_:;!|@')
        cy.screenshot();
		cy.get('button[type="submit"]').click()
		cy.screenshot();
    })
    it('Schedule homework', function() {
        cy.get('.item_editor_details').click().type('Nueva tarea programada')
        cy.get('.item_editor_assign_due').click()
        cy.get('.calendar__week').contains('23').click()
        cy.screenshot();
		cy.get('button[type="submit"]').click()
		cy.screenshot();
    })
    it('Prioritize task', function() {
        cy.get('.item_editor_details').click().type('Tarea priorizada')
        cy.get('.item_actions_priority').click()
        cy.get('.priority_picker_item').contains('Prioridad 2').click()
        cy.screenshot();
		cy.get('button[type="submit"]').click()
		cy.screenshot();
    })
    it('New sub-task', function() {
        cy.get('.item_editor_details').click().type('Nueva subtarea')
        cy.get('.item_actions_indent').click()
        cy.get('.indent_menu_desc').contains('Subtarea').click()
        cy.screenshot();
		cy.get('button[type="submit"]').click()
		cy.screenshot();
    })
})

describe('Test log out', function () {
    it('Log out', function () {
      cy.get('span[id="gear_holder"]').click()
      cy.screenshot();
      cy.get('div[class="usermenu__row-label"]').contains('Cerrar sesión').click()
      cy.wait(3000)
      cy.screenshot();
    })
  }) 