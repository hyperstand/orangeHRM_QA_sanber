class loginPom {
    visit() {
        cy.visit('https://www.saucedemo.com')
    }
    inputUsername(username) {
        cy.get('#user-name').type(username)
    }
    inputPassword(password) {
        cy.get('#password').type(password)
    }
    clickLgnBtn() {
        cy.get('.btn_action').should('be.visible')
        cy.get('.btn_action').click()
    }
    assertionLogin() {
        cy.url().should('include', 'inventory')
    }
}

export default new loginPom()
