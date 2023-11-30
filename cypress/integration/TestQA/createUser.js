/// <reference types="cypress"/>

let accessToken;

describe('Create User',()=>{
    
    it('Create New User',()=>{
        cy.request({
            method: 'POST',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/user',
            form: true,
            body:{
                username: 'ArizalP23',
                fullname: 'Arizal Prakasa',
                email: 'arizalprakasa23@gmail.com',
                password: 'TestQA'
            }
            
          }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body).to.have.property('message', 'User created successfully')
            expect(response.body.data).to.have.property('username','ArizalP23')
            expect(response.body.data).to.have.property('fullname','Arizal Prakasa')
            
          })
    })

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
            expect(response.body.data).to.have.property('access_token');
            accessToken = response.body.data.access_token;
          })
    })

    it('get user',()=>{
        cy.request({
            method: 'GET',
            url: 'http://103.41.204.69/galon/pusaka-online-be/public/api/backoffice/user?offset=null&limit=10',
            headers:  {
                Authorization: 'Bearer ' + accessToken
              },
            
        }).then((response)=>{
            expect(response.status).eq(200)
            expect(response.body).to.have.property("success",true)
            expect(response.body).to.have.property("message","Get user success")
            expect(response.body.data[0]).to.have.property("fullname","Arizal Prakasa")
            expect(response.body.data[0]).to.have.property("email","arizalprakasa23@gmail.com")
            
        })
    })
})