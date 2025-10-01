import loginPom from "../support/pom/loginPom"
import dataPom from "../fixtures/dataPom.json"

describe('Scenario Verifikasi Fungsi Login', () => {
  it('TC001-Login dengan username valid & password valid', () => {
    // cy.visit('https://www.saucedemo.com')
    // cy.get('#user-name').type('standard_user')
    // cy.get('#password').type('secret_sauce')
    // cy.get('.btn_action').should('be.visible')
    // cy.get('.btn_action').click()
    // cy.url().should('include', 'inventory')

    loginPom.visit()
    loginPom.inputUsername(dataPom.validusername)
    loginPom.inputPassword(dataPom.validPassword)
    loginPom.clickLgnBtn()
    loginPom.assertionLogin()
  })
})