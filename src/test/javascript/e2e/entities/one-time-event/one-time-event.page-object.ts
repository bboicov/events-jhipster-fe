import { element, by, ElementFinder } from 'protractor';

export class OneTimeEventComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-one-time-event div table .btn-danger'));
    title = element.all(by.css('jhi-one-time-event div h2#page-heading span')).first();

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

export class OneTimeEventUpdatePage {
    pageTitle = element(by.id('jhi-one-time-event-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    whenInput = element(by.id('field_when'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setWhenInput(when) {
        await this.whenInput.sendKeys(when);
    }

    async getWhenInput() {
        return this.whenInput.getAttribute('value');
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

export class OneTimeEventDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-oneTimeEvent-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-oneTimeEvent'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
