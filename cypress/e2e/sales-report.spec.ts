describe('sales report',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/sales/sales-report')
    })
    it('redirect to login page', () => {
      cy.location('pathname').should('eq', '/login')
    })
  })
  describe('user login', () => {
    beforeEach(() => {
      cy.visit('/login')
      cy.intercept('POST', `${Cypress.env('BASE_API_URL')}/auth/signin`, (req) => {
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
      cy.visit('/sales/sales-report')
    })

    it('show page sales report', () => {
      const body = {
        salesReports: [
          { id: 1, productCode:'NB001', warehouse: '2023-01-01', description:'PO-001', principle: 'supplier1', totalInvoiced: '2023-01-01', totalBeforeDiscount: 'NSJ-001', item: 'NFP-001', totalDiscount: '1000', totalAfterDiscount: '100', totalTax: '9000', totalAfterTax: '100',discount: '100' },
          { id: 2, productCode:'NB002', warehouse: '2022-01-01', description:'PO-002', principle: 'supplier2', totalInvoiced: '2022-01-01', totalBeforeDiscount: 'NSJ-002', item: 'NFP-002', totalDiscount: '2000', totalAfterDiscount: '100', totalTax: '1900', totalAfterTax: '100',discount: '100' },
          { id: 3, productCode:'NB003', warehouse: '2022-06-01', description:'PO-003', principle: 'supplier3', totalInvoiced: '2022-06-01', totalBeforeDiscount: 'NSJ-003', item: 'NFP-003', totalDiscount: '3000', totalAfterDiscount: '100', totalTax: '2900', totalAfterTax: '100',discount: '100' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/salesReports`, {
        status: 200,
        body: body
      }).as('getData');
      cy.contains('th','No.')
      cy.contains('th','Warehouse')
      cy.contains('th','Item')
      cy.contains('th','Description')
      cy.contains('th','Product Code')
      cy.contains('th','Customer')
      cy.contains('th','Total Invoiced')
      cy.contains('th','Total Before Discount')
      cy.contains('th','Total Discount')
      cy.contains('th','Total After Discount')
      cy.contains('th','Total Tax')
      cy.contains('th','Total After Tax')
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.warehouse').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].warehouse)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].item)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].description)
      })
      cy.get('td.productCode').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].productCode)
      })
      cy.get('td.principle').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].principle)
      })
      cy.get('td.totalInvoiced').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalInvoiced)
      })
      cy.get('td.totalBeforeDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalBeforeDiscount)
      })
      cy.get('td.totalDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalDiscount)
      })
      cy.get('td.totalAfterDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalAfterDiscount)
      })
      cy.get('td.totalTax').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalTax)
      })
      cy.get('td.totalAfterTax').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalAfterTax)
      })
    })
    it('show page item report, with filter', () => {
      const dateFrom = '2022-01-01'
      const dateTo = '2023-01-01'
      const item = 'item test'
      const warehouse = 'warehouse test'
      const body = {
        salesReports: [
          { id: 1, productCode:'NB001', warehouse: warehouse, description:'PO-001', principle: 'supplier1', totalInvoiced: '2023-01-01', totalBeforeDiscount: 'NSJ-001', item: item, totalDiscount: '1000', totalAfterDiscount: '100', totalTax: '9000', totalAfterTax: '100',discount: '100' },
          { id: 2, productCode:'NB002', warehouse: warehouse, description:'PO-002', principle: 'supplier2', totalInvoiced: '2022-01-01', totalBeforeDiscount: 'NSJ-002', item: item, totalDiscount: '2000', totalAfterDiscount: '100', totalTax: '1900', totalAfterTax: '100',discount: '100' },
          { id: 3, productCode:'NB003', warehouse: warehouse, description:'PO-003', principle: 'supplier3', totalInvoiced: '2022-06-01', totalBeforeDiscount: 'NSJ-003', item: item, totalDiscount: '3000', totalAfterDiscount: '100', totalTax: '2900', totalAfterTax: '100',discount: '100' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/salesReports?filter[dateFrom]=${encodeURI(dateFrom)}&filter[dateTo]=${encodeURI(dateTo)}&filter[item]=${encodeURI(item)}&filter[warehouse]=${encodeURI(warehouse)}`, {
        status: 200,
        body: body
      }).as('getData');
      cy.get('input[name="dateFrom"]').type(dateFrom)
      cy.get('input[name="dateTo"]').type(dateTo)
      cy.get('select[name="item"]').select(item)
      cy.get('select[name="warehouse"]').select(warehouse)
      cy.get('button#filter').click()
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.warehouse').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].warehouse)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].item)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].description)
      })
      cy.get('td.productCode').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].productCode)
      })
      cy.get('td.principle').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].principle)
      })
      cy.get('td.totalInvoiced').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalInvoiced)
      })
      cy.get('td.totalBeforeDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalBeforeDiscount)
      })
      cy.get('td.totalDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalDiscount)
      })
      cy.get('td.totalAfterDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalAfterDiscount)
      })
      cy.get('td.totalTax').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalTax)
      })
      cy.get('td.totalAfterTax').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalAfterTax)
      })
    })
    it('show page item report, with search', () => {
      const itemSearch = 'item test';
      const body = {
        salesReports: [
          { id: 1, productCode:'NB001', warehouse: '2023-01-01', description:'PO-001', principle: 'supplier1', totalInvoiced: '2023-01-01', totalBeforeDiscount: 'NSJ-001', item: itemSearch, totalDiscount: '1000', totalAfterDiscount: '100', totalTax: '9000', totalAfterTax: '100',discount: '100' },
          { id: 2, productCode:'NB002', warehouse: '2022-01-01', description:'PO-002', principle: 'supplier2', totalInvoiced: '2022-01-01', totalBeforeDiscount: 'NSJ-002', item: itemSearch, totalDiscount: '2000', totalAfterDiscount: '100', totalTax: '1900', totalAfterTax: '100',discount: '100' },
          { id: 3, productCode:'NB003', warehouse: '2022-06-01', description:'PO-003', principle: 'supplier3', totalInvoiced: '2022-06-01', totalBeforeDiscount: 'NSJ-003', item: itemSearch, totalDiscount: '3000', totalAfterDiscount: '100', totalTax: '2900', totalAfterTax: '100',discount: '100' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/salesReports?search=${encodeURI(itemSearch)}`, {
        status: 200,
        body: body
      }).as('getData');
      
      cy.get('input[name="search"]').type(itemSearch)
      cy.get('button#search').click()

      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.warehouse').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].warehouse)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].item)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].description)
      })
      cy.get('td.productCode').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].productCode)
      })
      cy.get('td.principle').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].principle)
      })
      cy.get('td.totalInvoiced').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalInvoiced)
      })
      cy.get('td.totalBeforeDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalBeforeDiscount)
      })
      cy.get('td.totalDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalDiscount)
      })
      cy.get('td.totalAfterDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalAfterDiscount)
      })
      cy.get('td.totalTax').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalTax)
      })
      cy.get('td.totalAfterTax').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReports[index].totalAfterTax)
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
    it('download sales report', () => {
      cy.get('button.download-sales-report').click()
      cy.get('.modal-download-sales-report-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
    it('print sales report', () => {
      cy.get('button.print-sales-report').click()
      cy.get('.modal-print-sales-report-progress').should('be.visible')
      cy.contains('th','No.')
      cy.contains('th','Warehouse')
      cy.contains('th','Item')
      cy.contains('th','Description')
      cy.contains('th','Product Code')
      cy.contains('th','Customer')
      cy.contains('th','Total Invoiced')
      cy.contains('th','Total Before Discount')
      cy.contains('th','Total Discount')
      cy.contains('th','Total After Discount')
      cy.contains('th','Total Tax')
      cy.contains('th','Total After Tax')
    })
  })
})