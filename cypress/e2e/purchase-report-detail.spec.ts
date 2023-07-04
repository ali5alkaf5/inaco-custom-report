describe('purchase report detail',() => {
  describe('user not login', () => {
    beforeEach(() => {
      cy.visit('/purchase/purchase-report-detail')
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
      cy.visit('/purchase/purchase-report-detail')
    })

    it('show page purchase report detail', () => {
      const body = {
        purchaseReportDetails: [
          { id: 1, purchaseOrderNumber:'NB001', warehouse: '2023-01-01', vendorNumber:'PO-001', vendorName: 'supplier1', createDate: '2023-01-01', noInvoice: 'NSJ-001', item: 'NFP-001', itemDescription: '1000', qtyVoucher: '100', materialPrice: '9000', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 2, purchaseOrderNumber:'NB002', warehouse: '2022-01-01', vendorNumber:'PO-002', vendorName: 'supplier2', createDate: '2022-01-01', noInvoice: 'NSJ-002', item: 'NFP-002', itemDescription: '2000', qtyVoucher: '100', materialPrice: '1900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 3, purchaseOrderNumber:'NB003', warehouse: '2022-06-01', vendorNumber:'PO-003', vendorName: 'supplier3', createDate: '2022-06-01', noInvoice: 'NSJ-003', item: 'NFP-003', itemDescription: '3000', qtyVoucher: '100', materialPrice: '2900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReportDetails`, {
        status: 200,
        body: body
      }).as('getData');
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
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.purchaseOrderNum').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].purchaseOrderNumber)
      })
      cy.get('td.warehouse').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].warehouse)
      })
      cy.get('td.vendorNo').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].vendorNumber)
      })
      cy.get('td.vendorName').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].vendorName)
      })
      cy.get('td.noInvoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].noInvoice)
      })
      cy.get('td.createDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].createDate)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].item)
      })
      cy.get('td.itemDescription').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].itemDescription)
      })
      cy.get('td.qtyVoucher').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].qtyVoucher)
      })
      cy.get('td.materialPrice').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].materialPrice)
      })
      cy.get('td.materialPriceConv').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].materialPriceConversion)
      })
      cy.get('td.discount').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].discount)
      })
      cy.get('td.afterDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].afterDiscount)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].ppn)
      })
      cy.get('td.total').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].total)
      })
    })
    it('show page purchase report detail, with filter', () => {
      const dateFrom = '2022-01-01'
      const dateTo = '2023-01-01'
      const supplier = 'PTABC'
      const item = 'itemTest'
      const warehouse = 'warehouseTest'
      const body = {
        purchaseReportDetails: [
          { id: 1, purchaseOrderNumber:'NB001', warehouse: warehouse, vendorNumber:'PO-001', vendorName: supplier, createDate: 'NF-001', noInvoice: 'NSJ-001', item: item, itemDescription: '1000', qtyVoucher: '100', materialPrice: '9000', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 2, purchaseOrderNumber:'NB002', warehouse: warehouse, vendorNumber:'PO-002', vendorName: supplier, createDate: 'NF-002', noInvoice: 'NSJ-002', item: item, itemDescription: '2000', qtyVoucher: '100', materialPrice: '1900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 3, purchaseOrderNumber:'NB003', warehouse: warehouse, vendorNumber:'PO-003', vendorName: supplier, createDate: 'NF-003', noInvoice: 'NSJ-003', item: item, itemDescription: '3000', qtyVoucher: '100', materialPrice: '2900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReportDetails?filter[dateFrom]=${encodeURI(dateFrom)}&filter[dateTo]=${encodeURI(dateTo)}&filter[supplier]=${encodeURI(supplier)}&filter[item]=${encodeURI(item)}&filter[warehouse]=${encodeURI(warehouse)}`, {
        status: 200,
        body: body
      }).as('getData');
      cy.get('input[name="dateFrom"]').type(dateFrom)
      cy.get('input[name="dateTo"]').type(dateTo)
      cy.get('select[name="supplier"]').select(supplier)
      cy.get('select[name="item"]').select(item)
      cy.get('select[name="warehouse"]').select(warehouse)
      cy.get('button#filter').click()
      cy.wait('@getData')
      cy.get('td.createDate').each(($td) => {
        expect(new Date($td.text())).to.be.gte(new Date(dateFrom));
        expect(new Date($td.text())).to.be.lte(new Date(dateTo));
      })
      cy.get('td.vendorName').each(($td) => {
        expect($td.text()).to.equal(supplier);
      })
      cy.get('td.item').each(($td) => {
        expect($td.text()).to.equal(item);
      })
      cy.get('td.warehouse').each(($td) => {
        expect($td.text()).to.equal(warehouse);
      })
    })
    it('show page purchase report detail, with search', () => {
      const supplierSearch = 'supplierTest';
      const body = {
        purchaseReportDetails: [
          { id: 1, purchaseOrderNumber:'NB001', warehouse: '2023-01-01', vendorNumber:'PO-001', vendorName: supplierSearch, createDate: '2023-01-01', noInvoice: 'NSJ-001', item: 'NFP-001', itemDescription: '1000', qtyVoucher: '100', materialPrice: '9000', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 2, purchaseOrderNumber:'NB002', warehouse: '2022-01-01', vendorNumber:'PO-002', vendorName: supplierSearch, createDate: '2022-01-01', noInvoice: 'NSJ-002', item: 'NFP-002', itemDescription: '2000', qtyVoucher: '100', materialPrice: '1900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 3, purchaseOrderNumber:'NB003', warehouse: '2022-06-01', vendorNumber:'PO-003', vendorName: supplierSearch, createDate: '2022-06-01', noInvoice: 'NSJ-003', item: 'NFP-003', itemDescription: '3000', qtyVoucher: '100', materialPrice: '2900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReportDetails?search[supplier]=${encodeURI(supplierSearch)}`, {
        status: 200,
        body: body
      }).as('getData');
      
      cy.get('input[name="search"]').type(supplierSearch)
      cy.get('button#search').click()

      cy.wait('@getData')
      cy.get('td#vendorName').each(($td) => {
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
      const body = {
        purchaseReportDetails: [
          { id: 1, purchaseOrderNumber:'NB001', warehouse: '2023-01-01', vendorNumber:'PO-001', vendorName: 'supplier1', createDate: '2023-01-01', noInvoice: 'NSJ-001', item: 'NFP-001', itemDescription: '1000', qtyVoucher: '100', materialPrice: '9000', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 2, purchaseOrderNumber:'NB002', warehouse: '2022-01-01', vendorNumber:'PO-002', vendorName: 'supplier2', createDate: '2022-01-01', noInvoice: 'NSJ-002', item: 'NFP-002', itemDescription: '2000', qtyVoucher: '100', materialPrice: '1900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
          { id: 3, purchaseOrderNumber:'NB003', warehouse: '2022-06-01', vendorNumber:'PO-003', vendorName: 'supplier3', createDate: '2022-06-01', noInvoice: 'NSJ-003', item: 'NFP-003', itemDescription: '3000', qtyVoucher: '100', materialPrice: '2900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          totalDocument: 3,
        }
      }
      cy.intercept('GET', `${Cypress.env('BASE_API_URL')}/purchaseReportDetails`, {
        status: 200,
        body: body
      }).as('getData');
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
      cy.wait('@getData')
      cy.get('td.no').each(($td, index)=>{
        expect($td.text()).to.equal(index)
      })
      cy.get('td.purchaseOrderNum').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].purchaseOrderNumber)
      })
      cy.get('td.warehouse').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].warehouse)
      })
      cy.get('td.vendorNo').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].vendorNumber)
      })
      cy.get('td.vendorName').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].vendorName)
      })
      cy.get('td.noInvoice').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].noInvoice)
      })
      cy.get('td.createDate').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].createDate)
      })
      cy.get('td.item').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].item)
      })
      cy.get('td.itemDescription').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].itemDescription)
      })
      cy.get('td.qtyVoucher').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].qtyVoucher)
      })
      cy.get('td.materialPrice').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].materialPrice)
      })
      cy.get('td.materialPriceConv').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].materialPriceConversion)
      })
      cy.get('td.discount').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].discount)
      })
      cy.get('td.afterDiscount').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].afterDiscount)
      })
      cy.get('td.ppn').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].ppn)
      })
      cy.get('td.total').each(($td, index)=>{
        expect($td.text()).to.equal(body.purchaseReportDetails[index].total)
      })
    })
  })
})