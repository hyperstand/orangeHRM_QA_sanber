describe('Login Skenario', () => {
  it('ORANGEHRM_LOGIN_01 - Masuk Orange HRM dengan username dan password benar ', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('getEmployeesSummary');

    // Visit the login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    // Type username and password
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    
    // Click the login button
    cy.get('.oxd-button').click();
    
    // Verify that the user has successfully logged in and is on the Dashboard page
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard');
    
    // Wait for the intercepted network request to complete
    cy.wait('@getEmployeesSummary').then((interception) => {
      // You can now assert on the intercepted response, for example:
      expect(interception.response.statusCode).to.eq(200); // Ensure the response status code is 200
      expect(interception.response.body).to.have.property('data'); // Ensure the response has 'data' property
    });//cy.get('.oxd-userdropdown-name').should('have.text', 'manda bathram');
  })
   it('ORANGEHRM_LOGIN_02 - Masuk Orange HRM dengan username dan password salah ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
     cy.intercept('POST', '/web/index.php/auth/login').as('loginRequest');
    cy.get('[name="username"]').type('test')
    cy.get('[name="password"]').type('test')
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert-content > .oxd-text').should('have.text', 'Invalid credentials');
    // Wait for the login request and assert the response
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(401);  // Assuming 401 for invalid credentials
    });
  
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
   cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  // Intercept the forgot password page request
  cy.intercept('GET', '/web/index.php/auth/requestPasswordResetCode').as('forgotPasswordRequest');
  
  cy.get('.orangehrm-login-forgot > .oxd-text').click();
  
  // Wait for the request and assert the navigation
  cy.wait('@forgotPasswordRequest');
  cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
})
})