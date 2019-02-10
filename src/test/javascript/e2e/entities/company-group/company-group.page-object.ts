import { element, by, ElementFinder } from 'protractor';

export class CompanyGroupComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-company-group div table .btn-danger'));
    title = element.all(by.css('jhi-company-group div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CompanyGroupUpdatePage {
    pageTitle = element(by.id('jhi-company-group-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    contact_emailInput = element(by.id('field_contact_email'));
    contact_phoneInput = element(by.id('field_contact_phone'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setContact_emailInput(contact_email) {
        await this.contact_emailInput.sendKeys(contact_email);
    }

    async getContact_emailInput() {
        return this.contact_emailInput.getAttribute('value');
    }

    async setContact_phoneInput(contact_phone) {
        await this.contact_phoneInput.sendKeys(contact_phone);
    }

    async getContact_phoneInput() {
        return this.contact_phoneInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CompanyGroupDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-companyGroup-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-companyGroup'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
