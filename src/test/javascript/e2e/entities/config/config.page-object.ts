import { element, by, ElementFinder } from 'protractor';

export class ConfigComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-config div table .btn-danger'));
    title = element.all(by.css('jhi-config div h2#page-heading span')).first();

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

export class ConfigUpdatePage {
    pageTitle = element(by.id('jhi-config-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    keyInput = element(by.id('field_key'));
    valueInput = element(by.id('field_value'));
    authorityInput = element(by.id('field_authority'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setKeyInput(key) {
        await this.keyInput.sendKeys(key);
    }

    async getKeyInput() {
        return this.keyInput.getAttribute('value');
    }

    async setValueInput(value) {
        await this.valueInput.sendKeys(value);
    }

    async getValueInput() {
        return this.valueInput.getAttribute('value');
    }

    async setAuthorityInput(authority) {
        await this.authorityInput.sendKeys(authority);
    }

    async getAuthorityInput() {
        return this.authorityInput.getAttribute('value');
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

export class ConfigDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-config-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-config'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
