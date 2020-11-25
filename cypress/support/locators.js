const LOCATORS = {
    USER: {
        MAIL: 'adm@adm.com',
        PASS: 'admadm'
    },
    SYSTEM: {
        URL: 'localhost:3000'
    },
    FIELDS: {
        LOGIN_MENU_BTN: '.ml-auto > .nav-item > .nav-link',
        MAIL: '#user',
        PASS: '#password',
        LOGIN_CONFIRM_BTN: '.form-login > .btn'
    },
    PRODUCT: {
        MENU_ITEM_PRODUCT: '[href="/admin/produtos/add"]',
        NAME: '#prodNome',
        PRICE: '#prodPreco',
        SLUG: '#slug',
        STOCK: '#quanprodQuantidadetidade',
        CATEGORY: ':nth-child(3) > :nth-child(1) > .form-control',
        IMAGE: '#prodImagem',
        DESCRIPTION: '#prodDesc',
        BTN_CONFIRM: '.btn-primary'

    }

}
export default LOCATORS;