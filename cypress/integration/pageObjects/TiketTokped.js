class TiketTokped
{
Logo(){return cy.get('a[href="https://www.tokopedia.com"]')}

btnMasuk(){return cy.get('div.css-1xq076x > button:nth-child(1)')}

btnDaftar(){return cy.get('div.css-1xq076x > button:nth-child(2)')}

tautanDownload(){return cy.get('.cta-download')}

tautanTentang(){return cy.get('.cta-others li:nth-child(1)')}

tautanMitra(){return cy.get('.cta-others li:nth-child(2)')}

tautanPusatSlr(){return cy.get('.cta-others li:nth-child(3)')}

tautanPromo(){return cy.get('.cta-others li:nth-child(4)')}

tautanPusatBantuan(){return cy.get('.cta-others li:nth-child(5)')}

stasiunAsal(){return cy.get('input[data-testid="selectorAsal"]')}

stasiunTujuan(){return cy.get('input[data-testid="selectorTujuan"]')}

btnSwap(){return cy.get('.location div.css-1o0w0r')}

tanggalBerangkat(){return cy.get('[data-testid="selectorBerangkat"]')}

checklisPulang(){return cy.get('label.checkbox')}

tanggalPulang(){return cy.get('div.css-x135yu')}

jumlahPenumpang(){return cy.get('[data-testid="selectorJumlah Penumpang"]')}

btnCariTiket(){return cy.get('div button[data-testid="searchTicketButton"]')}

Kalender(){return cy.get('.css-1q62ntx > :nth-child(2)')}

KalenderPertama(){return cy.get('table.css-lfz9gb:nth-child(1) tbody tr td div.date')}

KalenderKedua(){return cy.get('table.css-lfz9gb:nth-child(2) tbody tr td div.date')}

addPenumpang(){return cy.get('.css-1ngc44a')}

stasiunSuggest(){return cy.get('.css-1q62ntx > .css-zpv22 > :nth-child(1)')}

daftarStasiun(){return cy.get('.css-1q62ntx > .css-zpv22 > .css-128hibx')}

btnSimpanJumlahPenumpang(){return cy.get('button[class="css-141g7c9-unf-btn eg8apji0"]')}

}
export default TiketTokped