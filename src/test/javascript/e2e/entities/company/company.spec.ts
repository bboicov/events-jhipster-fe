/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompanyComponentsPage, CompanyDeleteDialog, CompanyUpdatePage } from './company.page-object';

const expect = chai.expect;

describe('Company e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let companyUpdatePage: CompanyUpdatePage;
    let companyComponentsPage: CompanyComponentsPage;
    let companyDeleteDialog: CompanyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Companies', async () => {
        await navBarPage.goToEntity('company');
        companyComponentsPage = new CompanyComponentsPage();
        expect(await companyComponentsPage.getTitle()).to.eq('eventsApp.company.home.title');
    });

    it('should load create Company page', async () => {
        await companyComponentsPage.clickOnCreateButton();
        companyUpdatePage = new CompanyUpdatePage();
        expect(await companyUpdatePage.getPageTitle()).to.eq('eventsApp.company.home.createOrEditLabel');
        await companyUpdatePage.cancel();
    });

    it('should create and save Companies', async () => {
        const nbButtonsBeforeCreate = await companyComponentsPage.countDeleteButtons();

        await companyComponentsPage.clickOnCreateButton();
        await promise.all([
            companyUpdatePage.setNameInput('name'),
            companyUpdatePage.setAddressInput('address'),
            companyUpdatePage.setCityInput('city'),
            companyUpdatePage.setStateInput('state'),
            companyUpdatePage.setCountryInput('country'),
            companyUpdatePage.setPhoneInput('phone'),
            companyUpdatePage.setLongitudeInput('5'),
            companyUpdatePage.setLatitudeInput('5'),
            companyUpdatePage.setTagsInput('tags'),
            companyUpdatePage.setDescriptionInput('description'),
            // companyUpdatePage.eventSelectLastOption(),
            companyUpdatePage.userSelectLastOption()
        ]);
        expect(await companyUpdatePage.getNameInput()).to.eq('name');
        expect(await companyUpdatePage.getAddressInput()).to.eq('address');
        expect(await companyUpdatePage.getCityInput()).to.eq('city');
        expect(await companyUpdatePage.getStateInput()).to.eq('state');
        expect(await companyUpdatePage.getCountryInput()).to.eq('country');
        expect(await companyUpdatePage.getPhoneInput()).to.eq('phone');
        expect(await companyUpdatePage.getLongitudeInput()).to.eq('5');
        expect(await companyUpdatePage.getLatitudeInput()).to.eq('5');
        expect(await companyUpdatePage.getTagsInput()).to.eq('tags');
        expect(await companyUpdatePage.getDescriptionInput()).to.eq('description');
        await companyUpdatePage.save();
        expect(await companyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Company', async () => {
        const nbButtonsBeforeDelete = await companyComponentsPage.countDeleteButtons();
        await companyComponentsPage.clickOnLastDeleteButton();

        companyDeleteDialog = new CompanyDeleteDialog();
        expect(await companyDeleteDialog.getDialogTitle()).to.eq('eventsApp.company.delete.question');
        await companyDeleteDialog.clickOnConfirmButton();

        expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
