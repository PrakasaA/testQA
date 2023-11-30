/// <reference types="cypress"/>

import TiketTokped from "../pageObjects/TiketTokped"
let Tokped=new TiketTokped

describe('Testing pada Halaman Tiket Tokopedia',()=>{
        beforeEach('pengguna membuka halaman tiket tokopedia',()=>{
            cy.visit('https://tiket.tokopedia.com/kereta-api/', { headers: { "Accept-Encoding": "gzip, deflate" } });
        })
        it('Validasi Logo dan Tautan',()=>{
            Tokped.Logo().should('be.visible')
            Tokped.Logo().should('have.attr','class','css-rjb1gb')
            
            Tokped.tautanDownload().should('be.visible')
            Tokped.tautanDownload().should('have.text','Download Tokopedia App')
            
            Tokped.tautanTentang().should('be.visible')
            Tokped.tautanTentang().should('have.text','Tentang Tokopedia')

            Tokped.tautanMitra().should('be.visible')
            Tokped.tautanMitra().should('have.text','Mitra Tokopedia')

            Tokped.tautanPusatSlr().should('be.visible')
            Tokped.tautanPusatSlr().should('have.text','Pusat Seller')

            Tokped.tautanPromo().should('be.visible')
            Tokped.tautanPromo().should('have.text','Promo')

            Tokped.tautanPusatBantuan().should('be.visible')
            Tokped.tautanPusatBantuan().should('have.text','Pusat Bantuan')
            
            
        })
        
        it('Validasi Button Daftar',()=>{
            Tokped.btnDaftar().should('be.visible')
            Tokped.btnDaftar().click()
            cy.url().should('include','register')
        })

        it('Validasi Button Masuk',()=>{
            Tokped.btnMasuk().should('be.visible')
            Tokped.btnMasuk().click()
            cy.url().should('include','login')
        })

        it('Vaidasi Button Cari tiket',()=>{
            Tokped.btnCariTiket().should('be.visible')
            Tokped.btnCariTiket().click({force: true})
            cy.url().should('include','search')
        })

        it('Validasi Stasiun Asal',()=>{
            Tokped.stasiunAsal().should('be.visible')
            Tokped.stasiunAsal().click()
            Tokped.stasiunSuggest().should('have.text','STASIUN POPULER')
        })

        it('Validasi Stasiun Tujuan',()=>{
            Tokped.stasiunTujuan().should('be.visible')
            Tokped.stasiunTujuan().click()
            Tokped.stasiunSuggest().should('have.text','STASIUN POPULER')
        })

        it('Validasi Swap Location Button',()=>{
            Tokped.btnSwap().should('be.visible')
            
        })

        it('Validasi Tanggal keberangkatan',()=>{
            Tokped.tanggalBerangkat().should('be.visible')
            Tokped.tanggalBerangkat().click()
            Tokped.Kalender().should('be.visible')
        })

        it('Validasi Tanggal Pulang',()=>{
            Tokped.checklisPulang().click()
            Tokped.tanggalPulang().should('be.visible')
            Tokped.tanggalPulang().click()
            Tokped.Kalender().should('be.visible')
        })

        it('Validasi Jumlah Penumpang',()=>{
            Tokped.jumlahPenumpang().should('be.visible')
            Tokped.jumlahPenumpang().click({force: true})
            Tokped.addPenumpang().should('be.visible')
        })

})