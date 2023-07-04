describe('debts aging per customer report',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/debts-aging/debts-aging-customer-report')
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
      cy.visit('/debts-aging/debts-aging-customer-report')
    })

    it('show page debts aging per customer report', () => {
      const body = {
        debtsAgingReportPerCustomers: [
          { id: 1, customerID: 'wr1', name:'NB001', invoice: 'in1', invoiceDate: '2023-01-01', description:'PO-001', dpp: 'supplier1', ppn: '2023-01-01', totalInvoice: 'NSJ-001', payment: 'nacme1', debitMemo: '1000', cn: 'nacme1', remaining: '1000' },
          { id: 2, customerID: 'wr2', name:'NB002', invoice: 'in2', invoiceDate: '2022-01-01', description:'PO-002', dpp: 'supplier2', ppn: '2022-01-01', totalInvoice: 'NSJ-002', payment: 'nacme2', debitMemo: '2000', cn: 'nacme2', remaining: '2000' },
          { id: 3, customerID: 'wr3', name:'NB003', invoice: 'in3', invoiceDate: '2022-06-01', description:'PO-003', dpp: 'supplier3', ppn: '2022-06-01', totalInvoice: 'NSJ-003', payment: 'nacme3', debitMemo: '3000', cn: 'nacme3', remaining: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/debtsAgingReportPerCustomers`, {
        status: 200,
        body: body
      }).as('getData')
      cy.contains('th','Cust ID')
      cy.contains('th','Name')
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
      cy.get('td.customerID').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].customerID)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].name)
      })
      cy.get('td.invoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].invoice)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].invoiceDate)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].description)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].ppn)
      })
      cy.get('td.totalInvoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].totalInvoice)
      })
      cy.get('td.payment').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].payment)
      })
      cy.get('td.debitMemo').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].debitMemo)
      })
      cy.get('td.cn').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].remaining)
      })
      cy.get('td.remaining').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].remaining)
      })
    })
    it('show page debt aging customer report, with filter', () => {
      const dateInvoice = '2022-01-01'
      const customer = 'PT ABC'
      const body = {
        debtsAgingReportPerCustomers: [
          { id: 1, customerID: 'wr1', name: customer, invoice: 'in1', invoiceDate: '2023-01-01', description:'PO-001', dpp: 'supplier1', ppn: '2023-01-01', totalInvoice: 'NSJ-001', payment: 'nacme1', debitMemo: '1000', cn: 'nacme1', remaining: '1000' },
          { id: 2, customerID: 'wr2', name: customer, invoice: 'in2', invoiceDate: '2022-01-01', description:'PO-002', dpp: 'supplier2', ppn: '2022-01-01', totalInvoice: 'NSJ-002', payment: 'nacme2', debitMemo: '2000', cn: 'nacme2', remaining: '2000' },
          { id: 3, customerID: 'wr3', name: customer, invoice: 'in3', invoiceDate: '2022-06-01', description:'PO-003', dpp: 'supplier3', ppn: '2022-06-01', totalInvoice: 'NSJ-003', payment: 'nacme3', debitMemo: '3000', cn: 'nacme3', remaining: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/debtsAgingReportPerCustomers?filter[date]=${encodeURI(dateInvoice)}&filter[customer]=${encodeURI(customer)}`, {
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
      cy.get('td.customerID').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].customerID)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].name)
      })
      cy.get('td.invoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].invoice)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].invoiceDate)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].description)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].ppn)
      })
      cy.get('td.totalInvoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].totalInvoice)
      })
      cy.get('td.payment').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].payment)
      })
      cy.get('td.debitMemo').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].debitMemo)
      })
      cy.get('td.cn').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].remaining)
      })
      cy.get('td.remaining').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].remaining)
      })
    })
    it('show page debt aging customer report, with search', () => {
      const customerSearch = 'customer test';
      const body = {
        debtsAgingReportPerCustomers: [
          { id: 1, customerID: 'wr1', name: customerSearch, invoice: 'in1', invoiceDate: '2023-01-01', description:'PO-001', dpp: 'supplier1', ppn: '2023-01-01', totalInvoice: 'NSJ-001', payment: 'nacme1', debitMemo: '1000', cn: 'nacme1', remaining: '1000' },
          { id: 2, customerID: 'wr2', name: customerSearch, invoice: 'in2', invoiceDate: '2022-01-01', description:'PO-002', dpp: 'supplier2', ppn: '2022-01-01', totalInvoice: 'NSJ-002', payment: 'nacme2', debitMemo: '2000', cn: 'nacme2', remaining: '2000' },
          { id: 3, customerID: 'wr3', name: customerSearch, invoice: 'in3', invoiceDate: '2022-06-01', description:'PO-003', dpp: 'supplier3', ppn: '2022-06-01', totalInvoice: 'NSJ-003', payment: 'nacme3', debitMemo: '3000', cn: 'nacme3', remaining: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/debtsAgingReportPerCustomers?search=${encodeURI(customerSearch)}`, {
        status: 200,
        body: body
      }).as('getData');
      
      cy.get('input[name="search"]').type(customerSearch)
      cy.get('button#search').click()

      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.customerID').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].customerID)
      })
      cy.get('td.name').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].name)
      })
      cy.get('td.invoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].invoice)
      })
      cy.get('td.invoiceDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].invoiceDate)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].description)
      })
      cy.get('td.dpp').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].dpp)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].ppn)
      })
      cy.get('td.totalInvoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].totalInvoice)
      })
      cy.get('td.payment').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].payment)
      })
      cy.get('td.debitMemo').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].debitMemo)
      })
      cy.get('td.cn').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].remaining)
      })
      cy.get('td.remaining').each(($td, index)=>{
        expect($td.text()).to.equal(body.debtsAgingReportPerCustomers[index].remaining)
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
    it('download debts aging per customer report', () => {
      cy.get('button.download-debts-aging-customer-report').click()
      cy.get('.modal-download-debts-aging-customer-report-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
    it('print debts aging per customer report', () => {
      cy.get('button.print-debts-aging-customer-report').click()
      cy.get('.modal-print-debts-aging-customer-report-progress').should('be.visible')
      cy.contains('th','Cust ID')
      cy.contains('th','Name')
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