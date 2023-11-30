/// <reference types="cypress"/>

describe('API Logout Test',()=>{
    it('verify succes logout',()=>{
      
        cy.loginAPI().then((tokenData) => {  
            cy.log(tokenData)
          
          cy.request({
            method: 'POST',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/logoutBackoffice',
            headers: {
              Authorization: 'Bearer ' + tokenData
            }
          }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body).to.have.property('message', 'Logout success')
            expect(response.body).to.have.property('data', null)
          })
        })  
    })

    it('verify logout without bearer token',()=>{
          
          cy.request({
            method: 'POST',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/logoutBackoffice',
            failOnStatusCode: false
            
          }).then((response) => {
            expect(response.status).eq(401)
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property("message","Unauthenticated")
            expect(response.body).to.have.property('data', null)
          })
        })  
    })
