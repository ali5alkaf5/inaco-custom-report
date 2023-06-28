describe('purchase report detail',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/purchase-report-detail')
    })
    it('redirect to login page', () => {
      cy.location('pathname').should('eq', '/login')
    })
  })
  describe('user login', () => {
    beforeEach(() => {
      cy.visit('/login')
      cy.get('button.login-google').click()
      cy.visit('/')
      cy.visit('/purchase-report-detail')
    })

    it('show page purchase report detail', () => {
      cy.contains('th','No.')
      cy.contains('th','Warehouse')
      cy.contains('th','Purchase Order Num')
      cy.contains('th','Vendor No.')
      cy.contains('th','Vendor Name')
      cy.contains('th','Create Date')
      cy.contains('th','No. Invoice')
      cy.contains('th','Item')
      cy.contains('th','Item Description')
      cy.contains('th','Qty Voucher')
      cy.contains('th','Material Price')
      cy.contains('th','Material Price Conv')
      cy.contains('th','Discount')
      cy.contains('th','After Discount')
      cy.contains('th','PPN')
      cy.contains('th','Total')
    })
    it('show page purchase report detail, with filter', () => {
      const dateFrom = '2022-01-01'
      const dateTo = '2023-01-01'
      const supplier = 'PT ABC'
      const item = 'item test'
      const warehouse = 'warehouse test'
      cy.intercept('GET', `/api/v1/purchaseReportDetail?filter[dateFrom]=${dateFrom}&filter[dateTo]=${dateTo}&filter[supplier]=${supplier}&filter[item]=${item}&filter[warehouse]=${warehouse}`, {
        status: 200,
        body: [
          { id: 1, dateInvoice: '2023-01-01', supplier: supplier, item: item, warehouse: warehouse },
          { id: 2, dateInvoice: '2022-01-01', supplier: supplier, item: item, warehouse: warehouse },
          { id: 2, dateInvoice: '2022-06-01', supplier: supplier, item: item, warehouse: warehouse },
        ]
      }).as('getData');
      cy.get('input[name="dateFrom"]').type(dateFrom)
      cy.get('input[name="dateTo"]').type(dateTo)
      cy.get('select[name="supplier"]').select(supplier)
      cy.get('select[name="item"]').select(item)
      cy.get('select[name="warehouse"]').select(warehouse)
      cy.get('button#filter').click()
      cy.wait('@getData')
      cy.get('td#dateInvoice').each(($td) => {
        expect(new Date($td.text())).to.be.gte(new Date(dateFrom));
        expect(new Date($td.text())).to.be.lte(new Date(dateTo));
      })
      cy.get('td#dataSupplier').each(($td) => {
        expect($td.text()).to.equal(supplier);
      })
      cy.get('td#dataItem').each(($td) => {
        expect($td.text()).to.equal(item);
      })
      cy.get('td#dataWarehouse').each(($td) => {
        expect($td.text()).to.equal(warehouse);
      })
    })
    it('show page purchase report detail, with search', () => {
      const supplierSearch = 'supplier test';
      cy.intercept('GET', `/api/v1/purchaseReportDetail?search=${supplierSearch}`, {
        status: 200,
        body: [
          { id: 1, supplier: supplierSearch },
          { id: 2, supplier: supplierSearch },
        ]
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
    it('download purchase report detail', () => {
      cy.get('button.download-purchase-report-detail').click()
      cy.get('.modal-download-purchase-report-detail-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
    it('print purchase report detail', () => {
      cy.get('button.print-purchase-report-detail').click()
      cy.get('.modal-print-purchase-report-detail-progress').should('be.visible')
      cy.contains('th','No.')
      cy.contains('th','Warehouse')
      cy.contains('th','Purchase Order Num')
      cy.contains('th','Vendor No.')
      cy.contains('th','Vendor Name')
      cy.contains('th','Create Date')
      cy.contains('th','No. Invoice')
      cy.contains('th','Item')
      cy.contains('th','Item Description')
      cy.contains('th','Qty Voucher')
      cy.contains('th','Material Price')
      cy.contains('th','Material Price Conv')
      cy.contains('th','Discount')
      cy.contains('th','After Discount')
      cy.contains('th','PPN')
      cy.contains('th','Total')
    })
  })
})