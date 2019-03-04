/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OneTimeEventComponentsPage, OneTimeEventDeleteDialog, OneTimeEventUpdatePage } from './one-time-event.page-object';

const expect = chai.expect;

describe('OneTimeEvent e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let oneTimeEventUpdatePage: OneTimeEventUpdatePage;
    let oneTimeEventComponentsPage: OneTimeEventComponentsPage;
    let oneTimeEventDeleteDialog: OneTimeEventDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load OneTimeEvents', async () => {
        await navBarPage.goToEntity('one-time-event');
        oneTimeEventComponentsPage = new OneTimeEventComponentsPage();
        expect(await oneTimeEventComponentsPage.getTitle()).to.eq('eventsApp.oneTimeEvent.home.title');
    });

    it('should load create OneTimeEvent page', async () => {
        await oneTimeEventComponentsPage.clickOnCreateButton();
        oneTimeEventUpdatePage = new OneTimeEventUpdatePage();
        expect(await oneTimeEventUpdatePage.getPageTitle()).to.eq('eventsApp.oneTimeEvent.home.createOrEditLabel');
        await oneTimeEventUpdatePage.cancel();
    });

    it('should create and save OneTimeEvents', async () => {
        const nbButtonsBeforeCreate = await oneTimeEventComponentsPage.countDeleteButtons();

        await oneTimeEventComponentsPage.clickOnCreateButton();
        await promise.all([oneTimeEventUpdatePage.setWhenInput('01/01/2001' + protractor.Key.TAB + '02:30AM')]);
        expect(await oneTimeEventUpdatePage.getWhenInput()).to.contain('2001-01-01T02:30');
        await oneTimeEventUpdatePage.save();
        expect(await oneTimeEventUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await oneTimeEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OneTimeEvent', async () => {
        const nbButtonsBeforeDelete = await oneTimeEventComponentsPage.countDeleteButtons();
        await oneTimeEventComponentsPage.clickOnLastDeleteButton();

        oneTimeEventDeleteDialog = new OneTimeEventDeleteDialog();
        expect(await oneTimeEventDeleteDialog.getDialogTitle()).to.eq('eventsApp.oneTimeEvent.delete.question');
        await oneTimeEventDeleteDialog.clickOnConfirmButton();

        expect(await oneTimeEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
