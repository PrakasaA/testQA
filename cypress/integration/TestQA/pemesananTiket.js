/// <reference types="cypress"/>

import TiketTokped from "../pageObjects/TiketTokped";
let Tokped=new TiketTokped
describe('Pemesanan Tiket Kereta Api',()=>{
    beforeEach('pengguna membuka halaman Tiket Tokopedia',()=>{
        cy.visit('https://tiket.tokopedia.com/kereta-api/', { headers: { "Accept-Encoding": "gzip, deflate" } });
    })

    it('pesan tiket dengan data yang valid',()=>{
        cy.pilihStasiunAsal('Bandung (BD)') 
        cy.pilihStasiunTujuan('Gambir (GMR)')
        cy.pilihTanggalBerangkat('4')
        cy.pilihTanggalPulang('6')

        Tokped.jumlahPenumpang().should('contain.text','1 dewasa')
        Tokped.btnSimpanJumlahPenumpang().click({force: true})

        Tokped.btnCariTiket().click({force: true})
        cy.url().should('include','search')
    })

    it('input valid data (tanggal yang sama)',()=>{
        cy.pilihStasiunAsal('Bandung (BD)')
        cy.pilihStasiunTujuan('Gambir (GMR)')
        cy.pilihTanggalBerangkat('2')
        cy.pilihTanggalPulang('2')

        Tokped.jumlahPenumpang().should('contain.text','1 dewasa')
        Tokped.btnSimpanJumlahPenumpang().click({force: true})

        Tokped.btnCariTiket().click({force: true})
        cy.url().should('include','search') 
    })

    it('input invalid data (stasiun yang sama)',()=>{
        cy.pilihStasiunAsal('Bandung (BD)')
        cy.pilihStasiunTujuan('Bandung (BD)')
        cy.get('div.error-text').should('be.visible')
        cy.get('div.error-text').should('contain.text','Stasiun keberangkatan dan tujuan tidak boleh sama.')
    })

    it('Menukarkan posisi stasiun',()=>{
        cy.pilihStasiunAsal('Bandung (BD)')
        cy.pilihStasiunTujuan('Gambir (GMR)')
        Tokped.btnSwap().click()
        Tokped.stasiunAsal().should('have.value','Gambir (GMR)')
        Tokped.stasiunTujuan().should('have.value','Bandung (BD)')
    })

    it('Jumlah Penumpang Maksimal',()=>{
        cy.pilihStasiunAsal('Bandung (BD)')
        cy.pilihStasiunTujuan('Gambir (GMR)')
        cy.pilihTanggalBerangkat('4')
        cy.get('div.quantity:nth-child(1) button[aria-label="Tambah 1"]').click({force: true}).dblclick({force: true})
        cy.get('div.quantity:nth-child(2) button[aria-label="Tambah 1"]').dblclick({force: true}).dblclick({force: true})
        Tokped.btnCariTiket().click({force: true})
        cy.url().should('include','search')
    })

    it('Input Stasiun Asal Tidak Tersedia',()=>{
        Tokped.stasiunAsal().type('Nanana')
        cy.get('.error-no-results').should('be.visible')
        cy.get('.error-no-results').should('contain.text','Nggak ada hasil yang cocok')
    })

    it('Input Stasiun Tujuan Tidak Tersedia',()=>{
        Tokped.stasiunAsal().type('Bandung')
        Tokped.stasiunTujuan().type('Nanana')
        cy.get('.error-no-results').should('be.visible')
        cy.get('.error-no-results').should('contain.text','Nggak ada hasil yang cocok')
    })
    
    it('Input Tanggal Pulang Sebelum Tanggal Berangkat',()=>{
        cy.pilihTanggalBerangkat('5')
        cy.pilihTanggalPulang('4')
        Tokped.tanggalBerangkat().should('contain.text','04 Sep 2023')
        
    })
})