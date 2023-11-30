///<reference types="cypress"/>

describe('E2E test',()=>{
    
    it('success login',()=>{
        cy.loginAPI().then((tokenData) => {  
            Cypress.env('tokenData', tokenData);

            cy.log(tokenData);
        })
    })

    it('success get data customer',()=>{
        
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/customer?offset=null&limit=10',
            headers: {
              Authorization: 'Bearer ' + Cypress.env('tokenData')
            }
        }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body).to.have.property('message', 'Get customer success')
            expect(response.body.data[0]).to.have.property("user_id",2)
            expect(response.body.data[0]).to.have.property("fullname","admin")
            expect(response.body.data[0]).to.have.property("username","admin")
            expect(response.body.data[0]).to.have.property("email","admin@example.com")
            })
    })

    it('verify get data table',()=>{
        
        cy.request({
        method: 'GET',
        url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/customerDataTable',
        headers: {
          Authorization: 'Bearer ' + Cypress.env('tokenData')
        }
      }).then((response) => {
        expect(response.status).eq(200)
        expect(response.body).to.have.property( "draw",0)
        expect(response.body).to.have.property("recordsTotal",12)
        expect(response.body).to.have.property("recordsFiltered",12)
        expect(response.body.data[0]).to.have.property("fullname","Backoffice")
        expect(response.body.data[0]).to.have.property("username","backoffice")
        expect(response.body.data[0]).to.have.property("email","backoffice22@gmail.com")
      })
    })

    it('Get User',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/user?offset=null&limit=10',
            headers:  {
                Authorization: 'Bearer ' + Cypress.env('tokenData')
              }
        }).then((response)=>{
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success',true)
            expect(response.body).to.have.property("message","Get user success")
            expect(response.body.data[0]).to.have.property("user_id",2)
            expect(response.body.data[0]).to.have.property("email","admin@example.com")
            expect(response.body.data[1]).to.have.property("user_id",45)
            expect(response.body.data[1]).to.have.property("email","backoffice22@gmail.com")
        })
    })

    it('Get Data Catagory',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/categories?offset=&limit=&search=null',
            headers:  {
                Authorization: 'Bearer ' + Cypress.env('tokenData')
              }
        }).then((response)=>{
            expect(response.status).to.eq(200) 
            expect(response.body.success).to.be.true
            expect(response.body.message).to.eq('Get categories success')
            expect(response.body.data).to.be.an('array')
            cy.log(response.body.data)
            if (response.body.data && response.body.data.length > 0) {
                expect(response.body.data[0].category_id).to.eq(8)
                expect(response.body.data[0].code).to.eq('CTY00008')
                expect(response.body.data[0].name).to.eq('Arkeologi')
              } else {
                // Handle the case when the data is undefined or empty
                cy.log('No data found in the response');
              }
            
            })
    })



    it('success logout',()=>{
        cy.request({
            method: 'POST',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/logoutBackoffice',
            headers: {
              Authorization: 'Bearer ' + Cypress.env('tokenData')
            }
          }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body).to.have.property('message', 'Logout success')
            expect(response.body).to.have.property('data', null)
          })
    })

    

})