/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    MonthlyRecurringEventComponentsPage,
    MonthlyRecurringEventDeleteDialog,
    MonthlyRecurringEventUpdatePage
} from './monthly-recurring-event.page-object';

const expect = chai.expect;

describe('MonthlyRecurringEvent e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let monthlyRecurringEventUpdatePage: MonthlyRecurringEventUpdatePage;
    let monthlyRecurringEventComponentsPage: MonthlyRecurringEventComponentsPage;
    let monthlyRecurringEventDeleteDialog: MonthlyRecurringEventDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MonthlyRecurringEvents', async () => {
        await navBarPage.goToEntity('monthly-recurring-event');
        monthlyRecurringEventComponentsPage = new MonthlyRecurringEventComponentsPage();
        expect(await monthlyRecurringEventComponentsPage.getTitle()).to.eq('eventsApp.monthlyRecurringEvent.home.title');
    });

    it('should load create MonthlyRecurringEvent page', async () => {
        await monthlyRecurringEventComponentsPage.clickOnCreateButton();
        monthlyRecurringEventUpdatePage = new MonthlyRecurringEventUpdatePage();
        expect(await monthlyRecurringEventUpdatePage.getPageTitle()).to.eq('eventsApp.monthlyRecurringEvent.home.createOrEditLabel');
        await monthlyRecurringEventUpdatePage.cancel();
    });

    it('should create and save MonthlyRecurringEvents', async () => {
        const nbButtonsBeforeCreate = await monthlyRecurringEventComponentsPage.countDeleteButtons();

        await monthlyRecurringEventComponentsPage.clickOnCreateButton();
        await promise.all([
            monthlyRecurringEventUpdatePage.setDayOfMonthInput('5'),
            monthlyRecurringEventUpdatePage.setStartInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            monthlyRecurringEventUpdatePage.setEndInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await monthlyRecurringEventUpdatePage.getDayOfMonthInput()).to.eq('5');
        expect(await monthlyRecurringEventUpdatePage.getStartInput()).to.contain('2001-01-01T02:30');
        expect(await monthlyRecurringEventUpdatePage.getEndInput()).to.contain('2001-01-01T02:30');
        await monthlyRecurringEventUpdatePage.save();
        expect(await monthlyRecurringEventUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await monthlyRecurringEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MonthlyRecurringEvent', async () => {
        const nbButtonsBeforeDelete = await monthlyRecurringEventComponentsPage.countDeleteButtons();
        await monthlyRecurringEventComponentsPage.clickOnLastDeleteButton();

        monthlyRecurringEventDeleteDialog = new MonthlyRecurringEventDeleteDialog();
        expect(await monthlyRecurringEventDeleteDialog.getDialogTitle()).to.eq('eventsApp.monthlyRecurringEvent.delete.question');
        await monthlyRecurringEventDeleteDialog.clickOnConfirmButton();

        expect(await monthlyRecurringEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
