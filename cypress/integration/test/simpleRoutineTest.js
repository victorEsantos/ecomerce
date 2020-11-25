import LOCATORS from "../../support/locators";

describe('Teste de rotina comum no ecomerce', () => {
    // it('login adm test', ()=>{
    //     cy.visit('localhost:3000')
    //     cy.get(LOCATORS.FIELDS.LOGIN_MENU_BTN).click()
    //     cy.get(LOCATORS.FIELDS.MAIL).type('adm@adm.com')
    //     cy.get(LOCATORS.FIELDS.PASS).type('admadm')
    //     cy.get(LOCATORS.FIELDS.LOGIN_CONFIRM_BTN).click()
    // })

    beforeEach(() => {
        //efetua login antes de cada teste
        cy.visit(LOCATORS.SYSTEM.URL)
        cy.get(LOCATORS.FIELDS.LOGIN_MENU_BTN).click()
        cy.get(LOCATORS.FIELDS.MAIL).type('adm@adm.com')
        cy.get(LOCATORS.FIELDS.PASS).type('admadm')
        cy.get(LOCATORS.FIELDS.LOGIN_CONFIRM_BTN).click()
    })

    afterEach(() => {
        //efetua logout depois de cada teste
        cy.visit(LOCATORS.SYSTEM.URL)
        cy.get('.ml-auto > :nth-child(3) > .nav-link').click()
    })

    it('teste criação de produto', () => {
        cy.visit(LOCATORS.SYSTEM.URL)
        cy.get(LOCATORS.PRODUCT.MENU_ITEM_PRODUCT).click({force: true})
        cy.get(LOCATORS.PRODUCT.NAME).type('nome teste')
        cy.get(LOCATORS.PRODUCT.PRICE).type('123')
        cy.get(LOCATORS.PRODUCT.SLUG).type('slig-teste')
        cy.get(LOCATORS.PRODUCT.STOCK).type(1)
        cy.get(LOCATORS.PRODUCT.CATEGORY).select('5fa7f97d6cece1294cec40e8')
        cy.get(LOCATORS.PRODUCT.IMAGE).type('https://cdnv2.moovin.com.br/lojasplasutil/imagens/produtos/det/produto-teste-d6363200ff6d085db9adf4f244a841d3.png')
        cy.get(LOCATORS.PRODUCT.DESCRIPTION).type('TESTE TESTETESTE TESTETESTE TESTETESTE TESTETESTE TESTETESTE TESTETESTE TESTE')
        cy.get(LOCATORS.PRODUCT.BTN_CONFIRM).click()
    })

    it('teste presquisa de produto criado', () => {
        cy.visit(LOCATORS.SYSTEM.URL)
        cy.get('#pequisa').type('teste')
        cy.get('#pequisabtn').click()
    })

    //tentei criar um comando mas nao consegui.
})