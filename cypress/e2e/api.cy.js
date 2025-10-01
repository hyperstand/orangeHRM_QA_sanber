describe('Reqres.in API Automation with Cypress', () => {
  
  // 1. GET list users
  it('GET - List Users', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=2')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.page).to.eq(2)
        expect(response.body.data).to.be.an('array')
      })
  })

  // 2. GET single user
  it('GET - Single User', () => {
    cy.request('GET', 'https://reqres.in/api/users/2')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data).to.have.property('id', 2)
      })
  })

  // 3. GET single user not found
  it('GET - Single User Not Found', () => {
    cy.request({ method: 'GET', url: 'https://reqres.in/api/users/23', failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(404)
      })
  })

  // 4. POST - Create User
  it('POST - Create User', () => {
    const newUser = {
      name: 'John Doe',
      job: 'Developer'
    }
    cy.request('POST', 'https://reqres.in/api/users', newUser)
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.include(newUser)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('createdAt')
      })
  })

  // 5. PUT - Update User
  it('PUT - Update User', () => {
    const updatedUser = {
      name: 'Jane Doe',
      job: 'Manager'
    }
    cy.request('PUT', 'https://reqres.in/api/users/2', updatedUser)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.include(updatedUser)
        expect(response.body).to.have.property('updatedAt')
      })
  })

  // 6. PATCH - Update User Job
  it('PATCH - Update User Job', () => {
    const patchData = {
      job: 'Senior Developer'
    }
    cy.request('PATCH', 'https://reqres.in/api/users/2', patchData)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.include(patchData)
        expect(response.body).to.have.property('updatedAt')
      })
  })

  // 7. DELETE - Delete User
  it('DELETE - Delete User', () => {
    cy.request('DELETE', 'https://reqres.in/api/users/2')
      .then((response) => {
        expect(response.status).to.eq(204)
      })
  })

  // Bonus: Register User Successful
  it('POST - Register Successful', () => {
    const registerData = {
      email: "eve.holt@reqres.in",
      password: "pistol"
    }
    cy.request('POST', 'https://reqres.in/api/register', registerData)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('token')
      })
  })

  // Bonus: Register User Unsuccessful (missing password)
  it('POST - Register Unsuccessful', () => {
    const registerData = {
      email: "sydney@fife"
    }
    cy.request({ method: 'POST', url: 'https://reqres.in/api/register', body: registerData, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error')
      })
  })

})
