import { element, by, ElementFinder } from 'protractor';

export class CompanyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-company div table .btn-danger'));
    title = element.all(by.css('jhi-company div h2#page-heading span')).first();

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

export class CompanyUpdatePage {
    pageTitle = element(by.id('jhi-company-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    tagsInput = element(by.id('field_tags'));
    descriptionInput = element(by.id('field_description'));
    eventSelect = element(by.id('field_event'));
    addressSelect = element(by.id('field_address'));
    companyGroupSelect = element(by.id('field_companyGroup'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setTagsInput(tags) {
        await this.tagsInput.sendKeys(tags);
    }

    async getTagsInput() {
        return this.tagsInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async eventSelectLastOption() {
        await this.eventSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async eventSelectOption(option) {
        await this.eventSelect.sendKeys(option);
    }

    getEventSelect(): ElementFinder {
        return this.eventSelect;
    }

    async getEventSelectedOption() {
        return this.eventSelect.element(by.css('option:checked')).getText();
    }

    async addressSelectLastOption() {
        await this.addressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async addressSelectOption(option) {
        await this.addressSelect.sendKeys(option);
    }

    getAddressSelect(): ElementFinder {
        return this.addressSelect;
    }

    async getAddressSelectedOption() {
        return this.addressSelect.element(by.css('option:checked')).getText();
    }

    async companyGroupSelectLastOption() {
        await this.companyGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async companyGroupSelectOption(option) {
        await this.companyGroupSelect.sendKeys(option);
    }

    getCompanyGroupSelect(): ElementFinder {
        return this.companyGroupSelect;
    }

    async getCompanyGroupSelectedOption() {
        return this.companyGroupSelect.element(by.css('option:checked')).getText();
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

export class CompanyDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-company-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-company'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
