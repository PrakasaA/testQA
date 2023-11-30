/// <reference types="cypress"/>

describe('API TEST',()=>{
    it('success login',()=>{
        cy.loginAPI().then((tokenData) => {  
            Cypress.env('tokenData', tokenData);

            cy.log(tokenData);
        })
    })

    it('Get Data Catalog',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/catalog?limit=10&offset=0&name=&category=&tag=',
            headers: {
              Authorization: 'Bearer ' + Cypress.env('tokenData')
            }
          }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body).to.have.property('message', 'Get Catalog success')  
          })
    })

    it('Get Data Catalog Data Table',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/catalogDataTable?category=&tag=&status=ALL',
            headers: {
              Authorization: 'Bearer ' + Cypress.env('tokenData')
            }
          }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property("draw",0)
            expect(response.body).to.have.property("recordsTotal",0)
            expect(response.body).to.have.property("recordsFiltered",0)
            expect(response.body.input).to.have.property("category",null)
          })
    })

    it('Get Category',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/categories/20',
            headers: {
              Authorization: 'Bearer ' + Cypress.env('tokenData')
            }
          }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body).to.have.property('message', 'Get category success')  
          })
    })

    it('Get Data Category',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/categories?offset=&limit=&search=null',
            headers: {
              Authorization: 'Bearer ' + Cypress.env('tokenData')
            }
          }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body).to.have.property('message', 'Get categories success')  
          })
    })

    it('Get Data Catagory Data Table',()=>{
          cy.request({
              method: 'GET',
              url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/categoriesDataTable?status=ALL',
              headers: {
                Authorization: 'Bearer ' + Cypress.env('tokenData')
              }
          }).then((response) => {
              expect(response.status).eq(200)
              expect(response.body).to.have.property("draw",0)
              expect(response.body).to.have.property("recordsTotal",6)
              expect(response.body.data[0]).to.have.property("category_id",9) 
              })
    })

    it('Get Tag',()=>{
      cy.request({
        method: 'GET',
        url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/tag?limit=null&offset=null&search=null',
        headers: {
          Authorization: 'Bearer ' + Cypress.env('tokenData')
        }
      }).then((response) => {
        expect(response.status).eq(200)
        expect(response.body).to.have.property("success",true)
        expect(response.body).to.have.property("message","Get tag succes")
        cy.log(response.body.data)
        if (response.body.data && response.body.data.length > 0) {
          expect(response.body.data[0].tag_id).to.eq(5)
          expect(response.body.data[0]).to.have.property("name","adawd")
          } else {
            // Handle the case when the data is undefined or empty
            cy.log('No data found in the response');
          }
        
      })
    })

    it('Get Data Tag Data Table',()=>{
      cy.request({
        method: 'GET',
        url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/tagDataTable',
        headers: {
          Authorization: 'Bearer ' + Cypress.env('tokenData')
        }
    }).then((response) => {
        expect(response.status).eq(200)
        expect(response.body).to.have.property("draw",0)
        expect(response.body).to.have.property("recordsTotal",13)
        expect(response.body.data[0]).to.have.property('tag_id',1) 
        })
    })

})