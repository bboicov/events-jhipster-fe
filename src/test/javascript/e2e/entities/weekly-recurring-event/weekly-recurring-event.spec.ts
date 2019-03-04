/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    WeeklyRecurringEventComponentsPage,
    WeeklyRecurringEventDeleteDialog,
    WeeklyRecurringEventUpdatePage
} from './weekly-recurring-event.page-object';

const expect = chai.expect;

describe('WeeklyRecurringEvent e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let weeklyRecurringEventUpdatePage: WeeklyRecurringEventUpdatePage;
    let weeklyRecurringEventComponentsPage: WeeklyRecurringEventComponentsPage;
    let weeklyRecurringEventDeleteDialog: WeeklyRecurringEventDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load WeeklyRecurringEvents', async () => {
        await navBarPage.goToEntity('weekly-recurring-event');
        weeklyRecurringEventComponentsPage = new WeeklyRecurringEventComponentsPage();
        expect(await weeklyRecurringEventComponentsPage.getTitle()).to.eq('eventsApp.weeklyRecurringEvent.home.title');
    });

    it('should load create WeeklyRecurringEvent page', async () => {
        await weeklyRecurringEventComponentsPage.clickOnCreateButton();
        weeklyRecurringEventUpdatePage = new WeeklyRecurringEventUpdatePage();
        expect(await weeklyRecurringEventUpdatePage.getPageTitle()).to.eq('eventsApp.weeklyRecurringEvent.home.createOrEditLabel');
        await weeklyRecurringEventUpdatePage.cancel();
    });

    it('should create and save WeeklyRecurringEvents', async () => {
        const nbButtonsBeforeCreate = await weeklyRecurringEventComponentsPage.countDeleteButtons();

        await weeklyRecurringEventComponentsPage.clickOnCreateButton();
        await promise.all([
            weeklyRecurringEventUpdatePage.setDayOfWeekInput('5'),
            weeklyRecurringEventUpdatePage.setStartInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            weeklyRecurringEventUpdatePage.setEndInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await weeklyRecurringEventUpdatePage.getDayOfWeekInput()).to.eq('5');
        expect(await weeklyRecurringEventUpdatePage.getStartInput()).to.contain('2001-01-01T02:30');
        expect(await weeklyRecurringEventUpdatePage.getEndInput()).to.contain('2001-01-01T02:30');
        await weeklyRecurringEventUpdatePage.save();
        expect(await weeklyRecurringEventUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await weeklyRecurringEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last WeeklyRecurringEvent', async () => {
        const nbButtonsBeforeDelete = await weeklyRecurringEventComponentsPage.countDeleteButtons();
        await weeklyRecurringEventComponentsPage.clickOnLastDeleteButton();

        weeklyRecurringEventDeleteDialog = new WeeklyRecurringEventDeleteDialog();
        expect(await weeklyRecurringEventDeleteDialog.getDialogTitle()).to.eq('eventsApp.weeklyRecurringEvent.delete.question');
        await weeklyRecurringEventDeleteDialog.clickOnConfirmButton();

        expect(await weeklyRecurringEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
