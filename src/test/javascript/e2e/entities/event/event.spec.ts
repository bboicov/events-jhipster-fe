/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventComponentsPage, EventDeleteDialog, EventUpdatePage } from './event.page-object';

const expect = chai.expect;

describe('Event e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let eventUpdatePage: EventUpdatePage;
    let eventComponentsPage: EventComponentsPage;
    let eventDeleteDialog: EventDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Events', async () => {
        await navBarPage.goToEntity('event');
        eventComponentsPage = new EventComponentsPage();
        expect(await eventComponentsPage.getTitle()).to.eq('eventsApp.event.home.title');
    });

    it('should load create Event page', async () => {
        await eventComponentsPage.clickOnCreateButton();
        eventUpdatePage = new EventUpdatePage();
        expect(await eventUpdatePage.getPageTitle()).to.eq('eventsApp.event.home.createOrEditLabel');
        await eventUpdatePage.cancel();
    });

    it('should create and save Events', async () => {
        const nbButtonsBeforeCreate = await eventComponentsPage.countDeleteButtons();

        await eventComponentsPage.clickOnCreateButton();
        await promise.all([
            eventUpdatePage.setDescriptionInput('description'),
            eventUpdatePage.setDuration_minInput('5'),
            eventUpdatePage.setNameInput('name')
        ]);
        expect(await eventUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await eventUpdatePage.getDuration_minInput()).to.eq('5');
        expect(await eventUpdatePage.getNameInput()).to.eq('name');
        await eventUpdatePage.save();
        expect(await eventUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Event', async () => {
        const nbButtonsBeforeDelete = await eventComponentsPage.countDeleteButtons();
        await eventComponentsPage.clickOnLastDeleteButton();

        eventDeleteDialog = new EventDeleteDialog();
        expect(await eventDeleteDialog.getDialogTitle()).to.eq('eventsApp.event.delete.question');
        await eventDeleteDialog.clickOnConfirmButton();

        expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
