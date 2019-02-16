/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserInfoComponentsPage, UserInfoDeleteDialog, UserInfoUpdatePage } from './user-info.page-object';

const expect = chai.expect;

describe('UserInfo e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userInfoUpdatePage: UserInfoUpdatePage;
    let userInfoComponentsPage: UserInfoComponentsPage;
    let userInfoDeleteDialog: UserInfoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserInfos', async () => {
        await navBarPage.goToEntity('user-info');
        userInfoComponentsPage = new UserInfoComponentsPage();
        expect(await userInfoComponentsPage.getTitle()).to.eq('eventsApp.userInfo.home.title');
    });

    it('should load create UserInfo page', async () => {
        await userInfoComponentsPage.clickOnCreateButton();
        userInfoUpdatePage = new UserInfoUpdatePage();
        expect(await userInfoUpdatePage.getPageTitle()).to.eq('eventsApp.userInfo.home.createOrEditLabel');
        await userInfoUpdatePage.cancel();
    });

    it('should create and save UserInfos', async () => {
        const nbButtonsBeforeCreate = await userInfoComponentsPage.countDeleteButtons();

        await userInfoComponentsPage.clickOnCreateButton();
        await promise.all([
            userInfoUpdatePage.setDescriptionInput('description'),
            userInfoUpdatePage.userSelectLastOption(),
            userInfoUpdatePage.addressSelectLastOption()
            // userInfoUpdatePage.companyGroupSelectLastOption(),
        ]);
        expect(await userInfoUpdatePage.getDescriptionInput()).to.eq('description');
        await userInfoUpdatePage.save();
        expect(await userInfoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await userInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last UserInfo', async () => {
        const nbButtonsBeforeDelete = await userInfoComponentsPage.countDeleteButtons();
        await userInfoComponentsPage.clickOnLastDeleteButton();

        userInfoDeleteDialog = new UserInfoDeleteDialog();
        expect(await userInfoDeleteDialog.getDialogTitle()).to.eq('eventsApp.userInfo.delete.question');
        await userInfoDeleteDialog.clickOnConfirmButton();

        expect(await userInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
