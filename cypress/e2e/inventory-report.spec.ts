describe('inventory report',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/inventory/inventory-report')
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
      cy.visit('/inventory/inventory-report')
    })

    it('show page inventory report', () => {
      const body = {
        inventoryReports: [
          { id: 1, warehouse: 'wr1', item:'NB001', description: '2023-01-01', quantityInStock:'PO-001', issuesQuantity: 'supplier1', unitCost: '2023-01-01', startBalanceCost: 'NSJ-001', receiptsAmount: 'nacme1', issuesAmount: '1000' },
          { id: 2, warehouse: 'wr2', item:'NB002', description: '2022-01-01', quantityInStock:'PO-002', issuesQuantity: 'supplier2', unitCost: '2022-01-01', startBalanceCost: 'NSJ-002', receiptsAmount: 'nacme2', issuesAmount: '2000' },
          { id: 3, warehouse: 'wr3', item:'NB003', description: '2022-06-01', quantityInStock:'PO-003', issuesQuantity: 'supplier3', unitCost: '2022-06-01', startBalanceCost: 'NSJ-003', receiptsAmount: 'nacme3', issuesAmount: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/inventoryReports`, {
        status: 200,
        body: body
      }).as('getData')
      cy.contains('th','No.')
      cy.contains('th','Warehouse')
      cy.contains('th','Item')
      cy.contains('th','Description')
      cy.contains('th','Qty In Stock')
      cy.contains('th','Receipts Quantity')
      cy.contains('th','Issues Quantity')
      cy.contains('th','Unit Cost')
      cy.contains('th','Start Balance Cost')
      cy.contains('th','Receipts Amount')
      cy.contains('th','Issues Amount')
      
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.warehouse').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].warehouse)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].item)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].description)
      })
      cy.get('td.quantityInStock').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].quantityInStock)
      })
      cy.get('td.issuesQuantity').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].issuesQuantity)
      })
      cy.get('td.unitCost').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].unitCost)
      })
      cy.get('td.startBalanceCost').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].startBalanceCost)
      })
      cy.get('td.receiptsAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].receiptsAmount)
      })
      cy.get('td.issuesAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].issuesAmount)
      })
    })
    it('show page inventory report, with filter', () => {
      const dateFrom = '2022-01-01'
      const dateTo = '2023-01-01'
      const item = 'itemTest'
      const warehouse = 'warehouseTest'
      const body = {
        inventoryReports: [
          { id: 1, warehouse: warehouse, item: item, description: '2023-01-01', quantityInStock:'PO-001', issuesQuantity: 'supplier1', unitCost: '2023-01-01', startBalanceCost: 'NSJ-001', receiptsAmount: 'nacme1', issuesAmount: '1000' },
          { id: 2, warehouse: warehouse, item: item, description: '2022-01-01', quantityInStock:'PO-002', issuesQuantity: 'supplier2', unitCost: '2022-01-01', startBalanceCost: 'NSJ-002', receiptsAmount: 'nacme2', issuesAmount: '2000' },
          { id: 3, warehouse: warehouse, item: item, description: '2022-06-01', quantityInStock:'PO-003', issuesQuantity: 'supplier3', unitCost: '2022-06-01', startBalanceCost: 'NSJ-003', receiptsAmount: 'nacme3', issuesAmount: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/inventoryReports?filter[dateFrom]=${encodeURI(dateFrom)}&filter[dateTo]=${encodeURI(dateTo)}&filter[item]=${encodeURI(item)}&filter[warehouse]=${encodeURI(warehouse)}`, {
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
        expect($td.text()).to.equal(body.inventoryReports[index].warehouse)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].item)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].description)
      })
      cy.get('td.quantityInStock').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].quantityInStock)
      })
      cy.get('td.issuesQuantity').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].issuesQuantity)
      })
      cy.get('td.unitCost').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].unitCost)
      })
      cy.get('td.startBalanceCost').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].startBalanceCost)
      })
      cy.get('td.receiptsAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].receiptsAmount)
      })
      cy.get('td.issuesAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].issuesAmount)
      })
    })
    it('show page inventory report, with search', () => {
      const itemSearch = 'item test';
      const body = {
        inventoryReports: [
          { id: 1, warehouse: 'wr1', item: itemSearch, description: '2023-01-01', quantityInStock:'PO-001', issuesQuantity: 'supplier1', unitCost: '2023-01-01', startBalanceCost: 'NSJ-001', receiptsAmount: 'nacme1', issuesAmount: '1000' },
          { id: 2, warehouse: 'wr2', item: itemSearch, description: '2022-01-01', quantityInStock:'PO-002', issuesQuantity: 'supplier2', unitCost: '2022-01-01', startBalanceCost: 'NSJ-002', receiptsAmount: 'nacme2', issuesAmount: '2000' },
          { id: 3, warehouse: 'wr3', item: itemSearch, description: '2022-06-01', quantityInStock:'PO-003', issuesQuantity: 'supplier3', unitCost: '2022-06-01', startBalanceCost: 'NSJ-003', receiptsAmount: 'nacme3', issuesAmount: '3000' },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/inventoryReports?search=${encodeURI(itemSearch)}`, {
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
        expect($td.text()).to.equal(body.inventoryReports[index].warehouse)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].item)
      })
      cy.get('td.description').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].description)
      })
      cy.get('td.quantityInStock').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].quantityInStock)
      })
      cy.get('td.issuesQuantity').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].issuesQuantity)
      })
      cy.get('td.unitCost').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].unitCost)
      })
      cy.get('td.startBalanceCost').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].startBalanceCost)
      })
      cy.get('td.receiptsAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].receiptsAmount)
      })
      cy.get('td.issuesAmount').each(($td, index)=>{
        expect($td.text()).to.equal(body.inventoryReports[index].issuesAmount)
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
    it('download inventory report', () => {
      cy.get('button.download-inventory-report').click()
      cy.get('.modal-download-inventory-report-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
    it('print inventory report', () => {
      cy.get('button.print-inventory-report').click()
      cy.get('.modal-print-inventory-report-progress').should('be.visible')
      cy.contains('th','No.')
      cy.contains('th','Warehouse')
      cy.contains('th','Item')
      cy.contains('th','Description')
      cy.contains('th','Qty In Stock')
      cy.contains('th','Receipts Quantity')
      cy.contains('th','Issues Quantity')
      cy.contains('th','Unit Cost')
      cy.contains('th','Start Balance Cost')
      cy.contains('th','Receipts Amount')
      cy.contains('th','Issues Amount')
    })
  })
})