import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ShoppingList } from './../../../models';
import { ShoppingListProvider, UsersProvider, UtilProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-new-list',
  templateUrl: 'add-new-list.html',
})
export class AddNewListPage {

  userInvitations: Array<string>;
  shoppingListName: string;
  editMode: boolean;
  sharedList: boolean;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private shoppingListSrv: ShoppingListProvider,
    private userSrv: UsersProvider,
    private utilSrv: UtilProvider,
    private viewCtrl: ViewController
  ) { 
    let params: ShoppingList = this.navParams.get('listToEdit');
    this.userInvitations = new Array<string>();
    if(params) {
      this.editMode = true;
      this.shoppingListName = params.name;
      this.sharedList = Object.keys(params.sharedWith || {}).length > 1;
    } else {
      this.editMode = false;
      this.shoppingListName = '';
      this.sharedList = false;
    }
  }

  ionViewDidLoad() { }

  prepareNewInvitation() {
    this.userInvitations.push('');
  }

  removeInvitation(index: number) {
    this.userInvitations.splice(index, 1);
  }

  createNewShoppingList() {
    let invitations = this.userInvitations.filter((inv) => this.userSrv.isValidEmail(inv));
    console.log('inv: ', invitations);
    this.shoppingListSrv.createNewList(this.shoppingListName, this.sharedList)
      .then(docRef => {
        this.utilSrv.showToast('List created successfully');
        this.navCtrl.pop();
      })
      .catch(error => console.log('error: ', error));
  }

  editShoppingList() {
    this.viewCtrl.dismiss({
      name: this.shoppingListName
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

}
