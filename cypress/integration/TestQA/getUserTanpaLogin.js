/// <reference types="cypress"/>

describe('get user tanpa login',()=>{
    it('get user',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/user?offset=null&limit=10',
            
            
        }).then((response)=>{
            expect(response.status).eq(200)
            expect(response.body).to.have.property("success",true)
            expect(response.body).to.have.property("message","Get user success")
            
            
        })
    })
})