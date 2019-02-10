/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompanyGroupComponentsPage, CompanyGroupDeleteDialog, CompanyGroupUpdatePage } from './company-group.page-object';

const expect = chai.expect;

describe('CompanyGroup e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let companyGroupUpdatePage: CompanyGroupUpdatePage;
    let companyGroupComponentsPage: CompanyGroupComponentsPage;
    let companyGroupDeleteDialog: CompanyGroupDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CompanyGroups', async () => {
        await navBarPage.goToEntity('company-group');
        companyGroupComponentsPage = new CompanyGroupComponentsPage();
        expect(await companyGroupComponentsPage.getTitle()).to.eq('eventsApp.companyGroup.home.title');
    });

    it('should load create CompanyGroup page', async () => {
        await companyGroupComponentsPage.clickOnCreateButton();
        companyGroupUpdatePage = new CompanyGroupUpdatePage();
        expect(await companyGroupUpdatePage.getPageTitle()).to.eq('eventsApp.companyGroup.home.createOrEditLabel');
        await companyGroupUpdatePage.cancel();
    });

    it('should create and save CompanyGroups', async () => {
        const nbButtonsBeforeCreate = await companyGroupComponentsPage.countDeleteButtons();

        await companyGroupComponentsPage.clickOnCreateButton();
        await promise.all([
            companyGroupUpdatePage.setNameInput('name'),
            companyGroupUpdatePage.setContact_emailInput('contact_email'),
            companyGroupUpdatePage.setContact_phoneInput('contact_phone')
        ]);
        expect(await companyGroupUpdatePage.getNameInput()).to.eq('name');
        expect(await companyGroupUpdatePage.getContact_emailInput()).to.eq('contact_email');
        expect(await companyGroupUpdatePage.getContact_phoneInput()).to.eq('contact_phone');
        await companyGroupUpdatePage.save();
        expect(await companyGroupUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await companyGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CompanyGroup', async () => {
        const nbButtonsBeforeDelete = await companyGroupComponentsPage.countDeleteButtons();
        await companyGroupComponentsPage.clickOnLastDeleteButton();

        companyGroupDeleteDialog = new CompanyGroupDeleteDialog();
        expect(await companyGroupDeleteDialog.getDialogTitle()).to.eq('eventsApp.companyGroup.delete.question');
        await companyGroupDeleteDialog.clickOnConfirmButton();

        expect(await companyGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
