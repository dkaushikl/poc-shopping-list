import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';

import { ShoppingList } from './../../../models';
import { ShoppingListProvider, UsersProvider, UtilProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-new-list',
  templateUrl: 'add-new-list.html',
})
export class AddNewListPage {

  form: FormGroup;
  listId: string;
  userInvitations: Array<string>;
  shoppingListName: string;
  editMode: boolean;
  sharedList: boolean;
  sharedWith: Array<any>;

  fShoppingListName: string;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private shoppingListSrv: ShoppingListProvider,
    private userSrv: UsersProvider,
    private utilSrv: UtilProvider,
    private viewCtrl: ViewController
  ) { 

    this.form = this.formBuilder.group({
      'listName': ['', Validators.required]
    });

    let params: ShoppingList = this.navParams.get('listToEdit');
    this.userInvitations = new Array<string>();
    if(params) {
      this.listId = params.id;
      this.editMode = true;
      this.shoppingListName = params.name;
      this.sharedWith = Object.keys(params.sharedWith || {});
      this.sharedList = this.sharedWith.length > 1;
    } else {
      this.editMode = false;
      this.shoppingListName = '';
      this.sharedList = false;
    }
  }

  ionViewDidLoad() { }

  trackByIndex(index: number, value: number) {
    return index;
  }

  prepareNewInvitation() {
    const validLastEmail = this.userSrv.isValidEmail(this.userInvitations[this.userInvitations.length-1]);
    if(this.userInvitations.length >= 1 && !validLastEmail)
      this.utilSrv.showAlert('Data check', 'There is wrong address format; please, check it');
    else
      this.userInvitations.push('');
  }

  removeInvitation(index: number) {
    this.userInvitations.splice(index, 1);
  }

  sendInvitations() {
    let loading = this.loadingCtrl.create({ content: 'Checking addresses...' });
    loading.present();
    this.shoppingListSrv.sendUserInvitationsToNewUsers(this.listId, this.userInvitations).subscribe(
      (userIds) => {
        console.log('UserIds: ', userIds);
        const checkedUserIds = Object.keys(userIds);
        loading.dismiss();
        if(this.userInvitations.length !== checkedUserIds.length) {
          this.utilSrv.showAlert('Wrong address', 'Wrong email address detected; removing automatically...');
          this.userInvitations = this.userInvitations.filter(email => userIds[email]);
        }
        console.log('>> ', this.getArrayFromInvitationIds(userIds));
        this.shoppingListSrv.shareShoppingList(this.listId, this.getArrayFromInvitationIds(userIds));
      },
      (error) => {
        console.log('Error sending invitations: ', error);
        loading.dismiss();
      }
    );
  }

  createNewShoppingList() {
    let invitations = this.userInvitations.filter((inv) => this.userSrv.isValidEmail(inv));
    if(invitations.length === 0 && this.sharedList) {
      this.utilSrv.showToast('No valid targets found!');
    } else {
      this.shoppingListSrv.createNewList(this.form.controls['listName'].value, this.sharedList)
        .then(docRef => {
          this.utilSrv.showToast('List created successfully');
          this.navCtrl.pop();
        })
        .catch(error => console.log('error: ', error));
    }
  }

  editShoppingList() {
    let invitations = this.userInvitations.filter((inv) => this.userSrv.isValidEmail(inv));
    this.viewCtrl.dismiss({
      name: this.shoppingListName
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

  private getArrayFromInvitationIds(ids: Object) {
    let array: Array<string> = [];
    Object.keys(ids).forEach(id => array.push(ids[id]));
    return array;
  }

}
