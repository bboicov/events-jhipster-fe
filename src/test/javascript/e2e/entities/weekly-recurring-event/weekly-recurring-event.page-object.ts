import { element, by, ElementFinder } from 'protractor';

export class WeeklyRecurringEventComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-weekly-recurring-event div table .btn-danger'));
    title = element.all(by.css('jhi-weekly-recurring-event div h2#page-heading span')).first();

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

export class WeeklyRecurringEventUpdatePage {
    pageTitle = element(by.id('jhi-weekly-recurring-event-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dayOfWeekInput = element(by.id('field_dayOfWeek'));
    startInput = element(by.id('field_start'));
    endInput = element(by.id('field_end'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDayOfWeekInput(dayOfWeek) {
        await this.dayOfWeekInput.sendKeys(dayOfWeek);
    }

    async getDayOfWeekInput() {
        return this.dayOfWeekInput.getAttribute('value');
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

export class WeeklyRecurringEventDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-weeklyRecurringEvent-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-weeklyRecurringEvent'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
