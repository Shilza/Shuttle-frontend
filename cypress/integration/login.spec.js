describe('Authentication', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('should display "User does not exists"', () => {
        cy.getByDataTestId('input_username').type('testtest');
        cy.getByDataTestId('input_password').type('123123123');
        cy.getByDataTestId('submit_button').click();

        cy.get('.ant-message-error').should('be.visible');
        cy.get('.ant-message-error').find('span').contains('User does not exists');

        expect(localStorage.getItem('accessToken')).to.be.null;
        expect(localStorage.getItem('refreshToken')).to.be.null;
        expect(localStorage.getItem('expiresIn')).to.be.null;
        cy.wait(1000);
    });

    it('should display "Incorrect login or password"', () => {
        cy.getByDataTestId('input_username').type('test');
        cy.getByDataTestId('input_password').type('wrongpass');
        cy.getByDataTestId('submit_button').click();

        cy.get('.ant-message-error').should('be.visible');
        cy.get('.ant-message-error').find('span').contains('Incorrect login or password');

        expect(localStorage.getItem('accessToken')).to.be.null;
        expect(localStorage.getItem('refreshToken')).to.be.null;
        expect(localStorage.getItem('expiresIn')).to.be.null;
        cy.wait(1000);
    });

    it('should authenticate right user without Remember', () => {
        cy.getByDataTestId('input_username').type('test');
        cy.getByDataTestId('input_password').type('123123123');
        cy.getByDataTestId('checkbox_remember_me').click();
        cy.getByDataTestId('submit_button').click();

        cy.wait(3000).then(() => {
            cy.getByDataTestId('feed').should('be.visible');

            expect(localStorage.getItem('accessToken')).to.be.null;
            expect(localStorage.getItem('refreshToken')).to.be.null;
            expect(localStorage.getItem('expiresIn')).to.be.null;
        });
    });

    it('should authenticate right user', () => {
        cy.getByDataTestId('input_username').type('test');
        cy.getByDataTestId('input_password').type('123123123');
        cy.getByDataTestId('submit_button').click();

        cy.wait(3000).then(() => {
            cy.getByDataTestId('feed').should('be.visible');

            expect(localStorage.getItem('accessToken')).not.to.be.null;
            expect(localStorage.getItem('refreshToken')).not.to.be.null;
            expect(localStorage.getItem('expiresIn')).not.to.be.null;
        });
    });
});