///<reference types="cypress"/>
describe('verify module login',()=>{
    it('succes login',()=>{
        cy.request({
            method: 'POST',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/loginBackoffice',
            
            form: true,
            body: {
              email: 'admin',
              password: '123',
            },
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.property('access_token');
          });
    })

    it('verify login invalid data',()=>{
      cy.request({
            method: 'POST',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/loginBackoffice',
            failOnStatusCode: false,
            
            form: true,
            body: {
              email: 'admin',
              password: '345',
            },
      }).then((response) => {
            expect(response.status).to.equal(403);
            expect(response.body).to.have.property('success',false);
            expect(response.body).to.have.property("message","Email/Username atau password salah")
          });
      })
    

})
