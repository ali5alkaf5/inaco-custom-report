describe('sales report customer',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/sales/sales-report-customer')
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
      cy.visit('/sales/sales-report-customer')
    })

    it('show page sales report customer', () => {
      const body = {
        salesReportPerCustomers: [
          { id: 1, invoice:'NB001', invoiceDate: '2023-01-01', noFakturPajak:'PO-001', soldTo: 'supplier1', salesman: '2023-01-01', kdSalesman: 'NSJ-001', name: 'nacme1', dpp: '1000', ppn: '100', total: '9000' },
          { id: 2, invoice:'NB002', invoiceDate: '2022-01-01', noFakturPajak:'PO-002', soldTo: 'supplier2', salesman: '2022-01-01', kdSalesman: 'NSJ-002', name: 'nacme2', dpp: '2000', ppn: '100', total: '1900' },
          { id: 3, invoice:'NB003', invoiceDate: '2022-06-01', noFakturPajak:'PO-003', soldTo: 'supplier3', salesman: '2022-06-01', kdSalesman: 'NSJ-003', name: 'nacme3', dpp: '3000', ppn: '100', total: '2900' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/salesReportPerCustomers`, {
        status: 200,
        body: body
      }).as('getData')

      cy.contains('th','No.')
      cy.contains('th','Invoice')
      cy.contains('th','Invoice Date')
      cy.contains('th','No. Faktur Pajak')
      cy.contains('th','Sold To')
      cy.contains('th','Salesman')
      cy.contains('th','KD Salesman')
      cy.contains('th','Name')
      cy.contains('th','DPP')
      cy.contains('th','PPN')
      cy.contains('th','Total')

      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.invoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].invoice)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].invoiceDate)
      })
      cy.get('td.noFakturPajak').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].noFakturPajak)
      })
      cy.get('td.soldTo').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].soldTo)
      })
      cy.get('td.salesman').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].salesman)
      })
      cy.get('td.kdSalesman').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].kdSalesman)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].name)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].ppn)
      })
      cy.get('td.total').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].total)
      })
    })
    it('show page sales report, with filter', () => {
      const dateFrom = '2022-01-01'
      const dateTo = '2023-01-01'
      const customer = 'PT ABC'
      const body = {
        salesReportPerCustomers: [
          { id: 1, invoice:'NB001', invoiceDate: '2023-01-01', noFakturPajak:'PO-001', soldTo: customer, salesman: '2023-01-01', kdSalesman: 'NSJ-001', name: 'nacme1', dpp: '1000', ppn: '100', total: '9000' },
          { id: 2, invoice:'NB002', invoiceDate: '2022-01-01', noFakturPajak:'PO-002', soldTo: customer, salesman: '2022-01-01', kdSalesman: 'NSJ-002', name: 'nacme2', dpp: '2000', ppn: '100', total: '1900' },
          { id: 3, invoice:'NB003', invoiceDate: '2022-06-01', noFakturPajak:'PO-003', soldTo: customer, salesman: '2022-06-01', kdSalesman: 'NSJ-003', name: 'nacme3', dpp: '3000', ppn: '100', total: '2900' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/salesReportPerCustomers?filter[dateFrom]=${encodeURI(dateFrom)}&filter[dateTo]=${encodeURI(dateTo)}&filter[customer]=${encodeURI(customer)}`, {
        status: 200,
        body: body
      }).as('getData');
      cy.get('input[name="dateFrom"]').type(dateFrom)
      cy.get('input[name="dateTo"]').type(dateTo)
      cy.get('select[name="customer"]').select(customer)
      cy.get('button#filter').click()
      
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.invoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].invoice)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].invoiceDate)
      })
      cy.get('td.noFakturPajak').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].noFakturPajak)
      })
      cy.get('td.soldTo').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].soldTo)
      })
      cy.get('td.salesman').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].salesman)
      })
      cy.get('td.kdSalesman').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].kdSalesman)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].name)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].ppn)
      })
      cy.get('td.total').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].total)
      })
    })
    it('show page sales report, with search', () => {
      const customerSearch = 'customer test';
      const body = {
        salesReportPerCustomers: [
          { id: 1, invoice:'NB001', invoiceDate: '2023-01-01', noFakturPajak:'PO-001', soldTo: customerSearch, salesman: '2023-01-01', kdSalesman: 'NSJ-001', name: 'nacme1', dpp: '1000', ppn: '100', total: '9000' },
          { id: 2, invoice:'NB002', invoiceDate: '2022-01-01', noFakturPajak:'PO-002', soldTo: customerSearch, salesman: '2022-01-01', kdSalesman: 'NSJ-002', name: 'nacme2', dpp: '2000', ppn: '100', total: '1900' },
          { id: 3, invoice:'NB003', invoiceDate: '2022-06-01', noFakturPajak:'PO-003', soldTo: customerSearch, salesman: '2022-06-01', kdSalesman: 'NSJ-003', name: 'nacme3', dpp: '3000', ppn: '100', total: '2900' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/salesReportPerCustomers?search=${encodeURI(customerSearch)}`, {
        status: 200,
        body: body
      }).as('getData');
      
      cy.get('input[name="search"]').type(customerSearch)
      cy.get('button#search').click()

      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.invoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].invoice)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].invoiceDate)
      })
      cy.get('td.noFakturPajak').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].noFakturPajak)
      })
      cy.get('td.soldTo').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].soldTo)
      })
      cy.get('td.salesman').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].salesman)
      })
      cy.get('td.kdSalesman').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].kdSalesman)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].name)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].ppn)
      })
      cy.get('td.total').each(($td, index)=>{
        expect($td.text()).to.equal(body.salesReportPerCustomers[index].total)
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
    it('download sales report customer', () => {
      cy.get('button.download-sales-report-customer').click()
      cy.get('.modal-download-sales-report-customer-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
    it('print sales report customer', () => {
      cy.get('button.print-sales-report-customer').click()
      cy.get('.modal-print-sales-report-customer-progress').should('be.visible')
      cy.contains('th','No.')
      cy.contains('th','Invoice')
      cy.contains('th','Invoice Date')
      cy.contains('th','No. Faktur Pajak')
      cy.contains('th','Sold To')
      cy.contains('th','Salesman')
      cy.contains('th','KD Salesman')
      cy.contains('th','Name')
      cy.contains('th','DPP')
      cy.contains('th','PPN')
      cy.contains('th','Total')
    })
  })
})