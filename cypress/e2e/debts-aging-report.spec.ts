describe('debts aging report',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/debts-aging/debts-aging-report')
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
      cy.visit('/debts-aging/debts-aging-report')
    })

    it('show page debts aging report', () => {
      const body = {
        debtsAgingReports: [
          { id: 1, productCode: 'wr1', invoiceNumber:'NB001', invoiceDate: '2023-01-01', customerWarehouse:'PO-001', customer: 'supplier1', name: '2023-01-01', invoiceAmount: 'NSJ-001', payment: 'nacme1', remaining: '1000' },
          { id: 2, productCode: 'wr2', invoiceNumber:'NB002', invoiceDate: '2022-01-01', customerWarehouse:'PO-002', customer: 'supplier2', name: '2022-01-01', invoiceAmount: 'NSJ-002', payment: 'nacme2', remaining: '2000' },
          { id: 3, productCode: 'wr3', invoiceNumber:'NB003', invoiceDate: '2022-06-01', customerWarehouse:'PO-003', customer: 'supplier3', name: '2022-06-01', invoiceAmount: 'NSJ-003', payment: 'nacme3', remaining: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/debtsAgingReports`, {
        status: 200,
        body: body
      }).as('getData')
      cy.contains('th','Product Code')
      cy.contains('th','Name')
      cy.contains('th','Date Invoice')
      cy.contains('th','Sub Toral Per Principle')
      cy.contains('th','Invoice')
      cy.contains('th','Invoice Date')
      cy.contains('th','Description')
      cy.contains('th','DPP')
      cy.contains('th','PPN')
      cy.contains('th','Total Invoice')
      cy.contains('th','Payment')
      cy.contains('th','Debit Memo')
      cy.contains('th','CN')
      cy.contains('th','Remaining')
      
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.productCode').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].productCode)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].name)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceDate)
      })
      cy.get('td.customer').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].customer)
      })
      cy.get('td.invoiceNumber').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceNumber)
      })
      cy.get('td.invoiceAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceAmount)
      })
      cy.get('td.payment').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].payment)
      })
      cy.get('td.remaining').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].remaining)
      })
    })
    it('show page debt aging report, with filter', () => {
      const dateInvoice = '2022-01-01'
      const customer = 'PT ABC'
      const body = {
        debtsAgingReports: [
          { id: 1, productCode: 'wr1', invoiceNumber:'NB001', invoiceDate: dateInvoice, customerWarehouse:'PO-001', customer: customer, name: '2023-01-01', invoiceAmount: 'NSJ-001', payment: 'nacme1', remaining: '1000' },
          { id: 2, productCode: 'wr2', invoiceNumber:'NB002', invoiceDate: dateInvoice, customerWarehouse:'PO-002', customer: customer, name: '2022-01-01', invoiceAmount: 'NSJ-002', payment: 'nacme2', remaining: '2000' },
          { id: 3, productCode: 'wr3', invoiceNumber:'NB003', invoiceDate: dateInvoice, customerWarehouse:'PO-003', customer: customer, name: '2022-06-01', invoiceAmount: 'NSJ-003', payment: 'nacme3', remaining: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/debtsAgingReports?filter[date]=${encodeURI(dateInvoice)}&filter[customer]=${encodeURI(customer)}`, {
        status: 200,
        body: body
      }).as('getData');
      cy.get('input[name="date"]').type(dateInvoice)
      cy.get('select[name="customer"]').select(customer)
      cy.get('button#filter').click()
      
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.productCode').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].productCode)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].name)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceDate)
      })
      cy.get('td.customer').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].customer)
      })
      cy.get('td.invoiceNumber').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceNumber)
      })
      cy.get('td.invoiceAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceAmount)
      })
      cy.get('td.payment').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].payment)
      })
      cy.get('td.remaining').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].remaining)
      })
    })
    it('show page debt aging report, with search', () => {
      const customerSearch = 'customer test';
      const body = {
        debtsAgingReports: [
          { id: 1, productCode: 'wr1', invoiceNumber:'NB001', invoiceDate: 'dateInvoice', customerWarehouse:'PO-001', customer: customerSearch, name: '2023-01-01', invoiceAmount: 'NSJ-001', payment: 'nacme1', remaining: '1000' },
          { id: 2, productCode: 'wr2', invoiceNumber:'NB002', invoiceDate: 'dateInvoice', customerWarehouse:'PO-002', customer: customerSearch, name: '2022-01-01', invoiceAmount: 'NSJ-002', payment: 'nacme2', remaining: '2000' },
          { id: 3, productCode: 'wr3', invoiceNumber:'NB003', invoiceDate: 'dateInvoice', customerWarehouse:'PO-003', customer: customerSearch, name: '2022-06-01', invoiceAmount: 'NSJ-003', payment: 'nacme3', remaining: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/debtsAgingReports?search=${encodeURI(customerSearch)}`, {
        status: 200,
        body: body
      }).as('getData');
      
      cy.get('input[name="search"]').type(customerSearch)
      cy.get('button#search').click()

      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.productCode').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].productCode)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].name)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceDate)
      })
      cy.get('td.customer').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].customer)
      })
      cy.get('td.invoiceNumber').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceNumber)
      })
      cy.get('td.invoiceAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].invoiceAmount)
      })
      cy.get('td.payment').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].payment)
      })
      cy.get('td.remaining').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReports[index].remaining)
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
    it('download debts aging report', () => {
      cy.get('button.download-debts-aging-report').click()
      cy.get('.modal-download-debts-aging-report-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
    it('print debts aging report', () => {
      cy.get('button.print-debts-aging-report').click()
      cy.get('.modal-print-debts-aging-report-progress').should('be.visible')
      cy.contains('th','Product Code')
      cy.contains('th','Name')
      cy.contains('th','Date Invoice')
      cy.contains('th','Sub Toral Per Principle')
      cy.contains('th','Invoice')
      cy.contains('th','Invoice Date')
      cy.contains('th','Description')
      cy.contains('th','DPP')
      cy.contains('th','PPN')
      cy.contains('th','Total Invoice')
      cy.contains('th','Payment')
      cy.contains('th','Debit Memo')
      cy.contains('th','CN')
      cy.contains('th','Remaining')
    })
  })
})