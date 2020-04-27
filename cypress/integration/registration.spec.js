
describe('Registration', () => {

    beforeEach(() => {
        cy.visit('/register');
    });

    it('should display "Email already exists"', () => {
        cy.getByDataTestId('input_email').type('test@g.com');
        cy.getByDataTestId('input_username').type('testtest');
        cy.getByDataTestId('input_password').type('123123123');
        cy.getByDataTestId('input_password_confirmation').type('123123123');
        cy.get('button[type="submit"]').click();

        cy.get('.ant-message-error').should('be.visible');
        cy.get('.ant-message-error').find('span').contains('Email already exists');
        cy.wait(1000);
    });

    it('should display "Username already exists"', () => {
        cy.getByDataTestId('input_email').type('test@test.com');
        cy.getByDataTestId('input_username').type('test');
        cy.getByDataTestId('input_password').type('123123123');
        cy.getByDataTestId('input_password_confirmation').type('123123123');
        cy.get('button[type="submit"]').click();

        cy.get('.ant-message-error').should('be.visible');
        cy.get('.ant-message-error').find('span').contains('Username already exists');
        cy.wait(1000);
    });

    // TODO change email and password
    it('should display "Registered successfully"', () => {
        cy.getByDataTestId('input_email').type('registertest1@example.com');
        cy.getByDataTestId('input_username').type('ttest');
        cy.getByDataTestId('input_password').type('123123123');
        cy.getByDataTestId('input_password_confirmation').type('123123123');
        cy.get('button[type="submit"]').click();

        cy.get('.ant-message-success').should('be.visible');
        cy.get('.ant-message-success').find('span').contains('Registered successfully. Please, log in');

        expect(localStorage.getItem('accessToken')).to.be.null;
        expect(localStorage.getItem('refreshToken')).to.be.null;
        expect(localStorage.getItem('expiresIn')).to.be.null;
        cy.wait(1000);
    });
});