/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConfigComponentsPage, ConfigDeleteDialog, ConfigUpdatePage } from './config.page-object';

const expect = chai.expect;

describe('Config e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let configUpdatePage: ConfigUpdatePage;
    let configComponentsPage: ConfigComponentsPage;
    let configDeleteDialog: ConfigDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Configs', async () => {
        await navBarPage.goToEntity('config');
        configComponentsPage = new ConfigComponentsPage();
        expect(await configComponentsPage.getTitle()).to.eq('eventsApp.config.home.title');
    });

    it('should load create Config page', async () => {
        await configComponentsPage.clickOnCreateButton();
        configUpdatePage = new ConfigUpdatePage();
        expect(await configUpdatePage.getPageTitle()).to.eq('eventsApp.config.home.createOrEditLabel');
        await configUpdatePage.cancel();
    });

    it('should create and save Configs', async () => {
        const nbButtonsBeforeCreate = await configComponentsPage.countDeleteButtons();

        await configComponentsPage.clickOnCreateButton();
        await promise.all([
            configUpdatePage.setKeyInput('key'),
            configUpdatePage.setValueInput('value'),
            configUpdatePage.setAuthorityInput('authority')
        ]);
        expect(await configUpdatePage.getKeyInput()).to.eq('key');
        expect(await configUpdatePage.getValueInput()).to.eq('value');
        expect(await configUpdatePage.getAuthorityInput()).to.eq('authority');
        await configUpdatePage.save();
        expect(await configUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await configComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Config', async () => {
        const nbButtonsBeforeDelete = await configComponentsPage.countDeleteButtons();
        await configComponentsPage.clickOnLastDeleteButton();

        configDeleteDialog = new ConfigDeleteDialog();
        expect(await configDeleteDialog.getDialogTitle()).to.eq('eventsApp.config.delete.question');
        await configDeleteDialog.clickOnConfirmButton();

        expect(await configComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
