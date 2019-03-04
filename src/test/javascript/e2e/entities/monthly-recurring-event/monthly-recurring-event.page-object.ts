import { element, by, ElementFinder } from 'protractor';

export class MonthlyRecurringEventComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-monthly-recurring-event div table .btn-danger'));
    title = element.all(by.css('jhi-monthly-recurring-event div h2#page-heading span')).first();

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

export class MonthlyRecurringEventUpdatePage {
    pageTitle = element(by.id('jhi-monthly-recurring-event-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dayOfMonthInput = element(by.id('field_dayOfMonth'));
    startInput = element(by.id('field_start'));
    endInput = element(by.id('field_end'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDayOfMonthInput(dayOfMonth) {
        await this.dayOfMonthInput.sendKeys(dayOfMonth);
    }

    async getDayOfMonthInput() {
        return this.dayOfMonthInput.getAttribute('value');
    }

    async setStartInput(start) {
        await this.startInput.sendKeys(start);
    }

    async getStartInput() {
        return this.startInput.getAttribute('value');
    }

    async setEndInput(end) {
        await this.endInput.sendKeys(end);
    }

    async getEndInput() {
        return this.endInput.getAttribute('value');
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

export class MonthlyRecurringEventDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-monthlyRecurringEvent-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-monthlyRecurringEvent'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
