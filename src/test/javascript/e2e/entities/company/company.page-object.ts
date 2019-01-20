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
    addressInput = element(by.id('field_address'));
    cityInput = element(by.id('field_city'));
    stateInput = element(by.id('field_state'));
    countryInput = element(by.id('field_country'));
    phoneInput = element(by.id('field_phone'));
    longitudeInput = element(by.id('field_longitude'));
    latitudeInput = element(by.id('field_latitude'));
    tagsInput = element(by.id('field_tags'));
    descriptionInput = element(by.id('field_description'));
    eventSelect = element(by.id('field_event'));
    userSelect = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setAddressInput(address) {
        await this.addressInput.sendKeys(address);
    }

    async getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setStateInput(state) {
        await this.stateInput.sendKeys(state);
    }

    async getStateInput() {
        return this.stateInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async setLongitudeInput(longitude) {
        await this.longitudeInput.sendKeys(longitude);
    }

    async getLongitudeInput() {
        return this.longitudeInput.getAttribute('value');
    }

    async setLatitudeInput(latitude) {
        await this.latitudeInput.sendKeys(latitude);
    }

    async getLatitudeInput() {
        return this.latitudeInput.getAttribute('value');
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
