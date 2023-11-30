/// <reference types="cypress"/>
let accessToken;
let UserID;
describe('Delete User',()=>{
    
  it('Success Login With new User',()=>{
        cy.request({
            method: 'POST',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/loginBackoffice',
            
            form: true,
            body: {
              email: 'arizalprakasa23@gmail.com',
              password: 'TestQA',
            },
          }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('success',true)
            expect(response.body).to.have.property("message","Login success")
            expect(response.body.data.user).to.have.property("fullname","Arizal Prakasa")
            expect(response.body.data.user).to.have.property("username","ArizalP23")
            expect(response.body.data.user).to.have.property('user_id')
            UserID = response.body.data.user.user_id
            cy.log(UserID)
            expect(response.body.data).to.have.property('access_token');
            accessToken = response.body.data.access_token;
          })
    })

    it('get user by id',()=>{
      cy.request({
          method: 'GET',
          url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/user/' + UserID,
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
      }).then((response)=>{
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('success',true)
        expect(response.body).to.have.property("message","Get user success")
        expect(response.body.data).to.have.property("fullname","Arizal Prakasa")
        expect(response.body.data).to.have.property("username","ArizalP23")
      })
  })

    it('succes delete user',()=>{
        cy.request({
            method: 'DELETE',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/user/' + UserID,
            headers: {
                Authorization: 'Bearer ' + accessToken
              },
            

          }).then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('success',true)
            expect(response.body).to.have.property("message","Delete user success")
          })
    })

    it('get user by id',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/user/' + UserID,
            headers: {
              Authorization: 'Bearer ' + accessToken
            }
        }).then((response)=>{
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('success',true)
          expect(response.body).to.have.property("message","Get user success")
          expect(response.body).to.have.property('data',null)
        })
    })
})