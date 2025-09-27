describe('Login Skenario', () => {
  it('ORANGEHRM_LOGIN_01 - Masuk Orange HRM dengan username dan password benar ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('.oxd-button').click()
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard');
    //cy.get('.oxd-userdropdown-name').should('have.text', 'manda bathram');
  })
   it('ORANGEHRM_LOGIN_02 - Masuk Orange HRM dengan username dan password salah ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('test')
    cy.get('[name="password"]').type('test')
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert-content > .oxd-text').should('have.text', 'Invalid credentials');
  })
    it('ORANGEHRM_LOGIN_03 - Masuk Orange HRM dengan username dan password kosong ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]')
    cy.get('[name="password"]')
    cy.get('.oxd-button').click()
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
  })
    it('ORANGEHRM_LOGIN_04 - Masuk Orange HRM dengan username terisi dan password kosong ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]')
    cy.get('.oxd-button').click()
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
  })
    it('ORANGEHRM_LOGIN_05 - Gambar logo Orange HRM dapat click dan ke halaman login ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.orangehrm-login-branding > img').click()
  })
      it('ORANGEHRM_LOGIN_06 - icon social media ke halaman social media yang berhubngan dengan orange hrm ', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get("a[href='https://www.facebook.com/OrangeHRM/']").click();
      cy.get("a[href='https://twitter.com/orangehrm?lang=en']").click();
      cy.get("a[href='https://www.youtube.com/c/OrangeHRMInc']").click();

    })
  it('ORANGEHRM_LOGIN_07 - link forgot password ke halaman forgot password ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.orangehrm-login-forgot > .oxd-text').click()
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
  })
})