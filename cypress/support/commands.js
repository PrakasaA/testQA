// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import TiketTokped from "../integration/pageObjects/TiketTokped"
let Tokped= new TiketTokped
var tokenData
Cypress.Commands.add('pilihStasiunAsal', (namaStasiun) => {
    Tokped.stasiunAsal().click()
    Tokped.daftarStasiun().contains(namaStasiun).click()
})
Cypress.Commands.add('pilihStasiunTujuan', (namaStasiun) => {
    Tokped.stasiunTujuan().click()
    Tokped.daftarStasiun().contains(namaStasiun).click()
})
Cypress.Commands.add('pilihTanggalBerangkat', (Tanggal) => {
    Tokped.tanggalBerangkat().click()
    Tokped.KalenderPertama().contains(Tanggal).click()
})
Cypress.Commands.add('pilihTanggalPulang', (Tanggal) => {
    Tokped.checklisPulang().click()
    Tokped.tanggalPulang().click()
    Tokped.KalenderPertama().contains(Tanggal).click()
})
Cypress.Commands.add('loginAPI', () => {
    
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
        tokenData = response.body.data.access_token
        cy.wrap(tokenData)
        
    });
    return tokenData;
})