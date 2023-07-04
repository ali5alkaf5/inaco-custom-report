describe('purchase report',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/purchase/purchase-report')
    })
    it('redirect to login page', () => {
      cy.location('pathname').should('eq', '/login')
    })
  })
  describe('user login', () => {
    beforeEach(() => {
      cy.visit('/login')
      cy.intercept('POST', `http://localhost:3000/v1/auth/signin`, (req) => {
        const requestBody = JSON.parse(req.body);
  
        expect(requestBody).to.deep.equal({
          email: 'admin',
          password: 'admin123',
        });
        
        req.headers['authorization'] = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
  
        req.reply({
          status: 200,
          body: {
            accessToken: 'string12345'
          }
        })
      }).as('login')
      
      cy.get('input[name="email"]').type('admin')
      cy.get('input[name="password"]').type('admin123')
      cy.get('button#login').click()
      
      cy.wait('@login')
      cy.location('pathname').should('eq', '/')
      cy.visit('/purchase/purchase-report')
    })

    it('show page purchase report', () => {
      const body = {
        purchaseReports: [
          { id: 1, noBukti:'NB001', dateInvoice: '2023-01-01', purchaseInvoice:'PO-001', supplier: 'supplier1', noFaktur: 'NF-001', noSuratJalan: 'NSJ-001', noFakturPajak: 'NFP-001', dpp: '1000', ppn: '100', total: '900' },
          { id: 2, noBukti:'NB002', dateInvoice: '2022-01-01', purchaseInvoice:'PO-002', supplier: 'supplier2', noFaktur: 'NF-002', noSuratJalan: 'NSJ-002', noFakturPajak: 'NFP-002', dpp: '2000', ppn: '100', total: '1900' },
          { id: 3, noBukti:'NB003', dateInvoice: '2022-06-01', purchaseInvoice:'PO-003', supplier: 'supplier3', noFaktur: 'NF-003', noSuratJalan: 'NSJ-003', noFakturPajak: 'NFP-003', dpp: '3000', ppn: '100', total: '2900' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReports`, {
        status: 200,
        body: body
      }).as('getData');
      cy.contains('th','No.')
      cy.contains('th','No. Bukti')
      cy.contains('th','Date Invoice')
      cy.contains('th','Purchase Invoice')
      cy.contains('th','Supplier')
      cy.contains('th','No. Faktur')
      cy.contains('th','No. Surat Jalan')
      cy.contains('th','No. Faktur Pajak')
      cy.contains('th','DPP')
      cy.contains('th','PPN')
      cy.contains('th','Total')
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.noBukti').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noBukti)
      })
      cy.get('td.dateInvoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].dateInvoice)
      })
      cy.get('td.purchaseDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].purchaseInvoice)
      })
      cy.get('td.supplier').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].supplier)
      })
      cy.get('td.noFaktur').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noFaktur)
      })
      cy.get('td.noSuratJalan').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noSuratJalan)
      })
      cy.get('td.noFakturPajak').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noFakturPajak)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].ppn)
      })
      cy.get('td.total').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].total)
      })
    })
    it('show page purchase report, with filter', () => {
      const dateFrom = '2022-01-01'
      const dateTo = '2023-01-01'
      const supplier = 'PTABC'
      const body = {
        purchaseReports: [
          { id: 1, noBukti:'NB001', dateInvoice: '2023-01-01', purchaseInvoice:'PO-001', supplier: supplier, noFaktur: 'NF-001', noSuratJalan: 'NSJ-001', noFakturPajak: 'NFP-001', dpp: '1000', ppn: '100', total: '900' },
          { id: 2, noBukti:'NB002', dateInvoice: '2022-01-01', purchaseInvoice:'PO-002', supplier: supplier, noFaktur: 'NF-002', noSuratJalan: 'NSJ-002', noFakturPajak: 'NFP-002', dpp: '2000', ppn: '100', total: '1900' },
          { id: 3, noBukti:'NB003', dateInvoice: '2022-06-01', purchaseInvoice:'PO-003', supplier: supplier, noFaktur: 'NF-003', noSuratJalan: 'NSJ-003', noFakturPajak: 'NFP-003', dpp: '3000', ppn: '100', total: '2900' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReports?filter[dateFrom]=${encodeURI(dateFrom)}&filter[dateTo]=${encodeURI(dateTo)}&filter[supplier]=${encodeURI(supplier)}`, {
        status: 200,
        body: body
      }).as('getData');
      cy.get('input[name="dateFrom"]').type(dateFrom)
      cy.get('input[name="dateTo"]').type(dateTo)
      cy.get('select[name="supplier"]').select(supplier)
      cy.get('button#filter').click()
      cy.wait('@getData')
      cy.get('td#dateInvoice').each(($td) => {
        expect(new Date($td.text())).to.be.gte(new Date(dateFrom));
        expect(new Date($td.text())).to.be.lte(new Date(dateTo));
      })
      cy.get('td#dataSupplier').each(($td) => {
        expect($td.text()).to.equal(supplier);
      })
    })
    it('show page purchase report, with search', () => {
      const supplierSearch = 'supplierTest';
      const body = {
        purchaseReports: [
          { id: 1, noBukti:'NB001', dateInvoice: '2023-01-01', purchaseInvoice:'PO-001', supplier: supplierSearch, noFaktur: 'NF-001', noSuratJalan: 'NSJ-001', noFakturPajak: 'NFP-001', dpp: '1000', ppn: '100', total: '900' },
          { id: 2, noBukti:'NB002', dateInvoice: '2022-01-01', purchaseInvoice:'PO-002', supplier: supplierSearch, noFaktur: 'NF-002', noSuratJalan: 'NSJ-002', noFakturPajak: 'NFP-002', dpp: '2000', ppn: '100', total: '1900' },
          { id: 3, noBukti:'NB003', dateInvoice: '2022-06-01', purchaseInvoice:'PO-003', supplier: supplierSearch, noFaktur: 'NF-003', noSuratJalan: 'NSJ-003', noFakturPajak: 'NFP-003', dpp: '3000', ppn: '100', total: '2900' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReports?search[supplier]=${encodeURI(supplierSearch)}`, {
        status: 200,
        body: body
      }).as('getData');
      
      cy.get('input[name="search"]').type(supplierSearch)
      cy.get('button#search').click()

      cy.wait('@getData')
      cy.get('td#dataSupplier').each(($td) => {
        expect($td.text()).to.contain(supplierSearch);
      })
    })
    it('should navigate through pages correctly', () => {
      // Click next page button
      cy.get('.next-page-button').click();
      // Assert that the next page is displayed
      cy.get('.page-number').should('contain', '2'); // Assuming there is a page number element
  
      // Click previous page button
      cy.get('.previous-page-button').click();
      // Assert that the previous page is displayed again
      cy.get('.page-number').should('contain', '1');

      cy.get('.last-page-button').click();
      cy.get('.page-number').should('contain', '10'); // Assuming there are 10 pages in total
      // Verify that the next page button is disabled
      cy.get('.next-page-button').should('be.disabled');

      // Go back to the first page
      cy.get('.first-page-button').click();
      cy.get('.page-number').should('contain', '1');    
      // Verify that the previous page button is disabled
      cy.get('.previous-page-button').should('be.disabled');
    });
    it('download purchase report', () => {
      cy.get('button.download-purchase-report').click()
      cy.get('.modal-download-purchase-report-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
    it('print purchase report', () => {
      const body = {
        purchaseReports: [
          { id: 1, noBukti:'NB001', dateInvoice: '2023-01-01', purchaseInvoice:'PO-001', supplier: 'supplier1', noFaktur: 'NF-001', noSuratJalan: 'NSJ-001', noFakturPajak: 'NFP-001', dpp: '1000', ppn: '100', total: '900' },
          { id: 2, noBukti:'NB002', dateInvoice: '2022-01-01', purchaseInvoice:'PO-002', supplier: 'supplier2', noFaktur: 'NF-002', noSuratJalan: 'NSJ-002', noFakturPajak: 'NFP-002', dpp: '2000', ppn: '100', total: '1900' },
          { id: 3, noBukti:'NB003', dateInvoice: '2022-06-01', purchaseInvoice:'PO-003', supplier: 'supplier3', noFaktur: 'NF-003', noSuratJalan: 'NSJ-003', noFakturPajak: 'NFP-003', dpp: '3000', ppn: '100', total: '2900' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReports`, {
        status: 200,
        body: body
      }).as('getData');
      cy.get('button.print-purchase-report').click()
      cy.get('.modal-print-purchase-report-progress').should('be.visible')
      cy.contains('th','No.')
      cy.contains('th','No. Bukti')
      cy.contains('th','Date Invoice')
      cy.contains('th','Purchase Invoice')
      cy.contains('th','Supplier')
      cy.contains('th','No. Faktur')
      cy.contains('th','No. Surat Jalan')
      cy.contains('th','No. Faktur Pajak')
      cy.contains('th','DPP')
      cy.contains('th','PPN')
      cy.contains('th','Total')
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.noBukti').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noBukti)
      })
      cy.get('td.dateInvoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].dateInvoice)
      })
      cy.get('td.purchaseDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].purchaseInvoice)
      })
      cy.get('td.supplier').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].supplier)
      })
      cy.get('td.noFaktur').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noFaktur)
      })
      cy.get('td.noSuratJalan').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noSuratJalan)
      })
      cy.get('td.noFakturPajak').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].noFakturPajak)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].ppn)
      })
      cy.get('td.total').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReports[index].total)
      })
    })
  })
})