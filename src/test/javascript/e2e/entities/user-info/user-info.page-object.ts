import { element, by, ElementFinder } from 'protractor';

export class UserInfoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-user-info div table .btn-danger'));
    title = element.all(by.css('jhi-user-info div h2#page-heading span')).first();

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

export class UserInfoUpdatePage {
    pageTitle = element(by.id('jhi-user-info-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    userSelect = element(by.id('field_user'));
    addressSelect = element(by.id('field_address'));
    companyGroupSelect = element(by.id('field_companyGroup'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
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

export class UserInfoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-userInfo-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-userInfo'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
