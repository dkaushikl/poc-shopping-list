import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ShoppingList } from './../../../models';
import { ShoppingListProvider, UsersProvider, UtilProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-new-list',
  templateUrl: 'add-new-list.html',
})
export class AddNewListPage {

  form: FormGroup;
  userInvitations: Array<string>;
  shoppingListName: string;
  editMode: boolean;
  sharedList: boolean;
  sharedWith: Array<any>;

  fShoppingListName: string;

  constructor(
    private formBuilder: FormBuilder,
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
    this.userInvitations.push('');
  }

  removeInvitation(index: number) {
    this.userInvitations.splice(index, 1);
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

}
