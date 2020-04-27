
describe('Cypress', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('Authentication test', () => {
        it('should authenticate right user', () => {
            // cy.clearCookies()

            cy.get('[data-testid="input_username"]').type('test');
            cy.get('[data-testid="input_password"]').type('123123123');
            cy.get('[data-testid="submit_button"]').click();

            // cy.url().should('include', '/feed')

            // cy.getCookie('token').should('not.be.null')
        })

        // it('should not authenticate wrong user', () => {
        //     cy.clearCookies()
        //
        //     cy.visit('/')
        //     cy.get('#login').type('existed_user')
        //     cy.get('#password').type('wrong_password')
        //     cy.get('button[type=submit]').click()
        //
        //     cy.url().should('not.include', '/feed')
        //     cy.getCookie('token').should('be.null')
        // })
    })
});