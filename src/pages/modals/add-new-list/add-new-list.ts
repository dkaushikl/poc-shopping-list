import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-new-list',
  templateUrl: 'add-new-list.html',
})
export class AddNewListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewListPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

}
