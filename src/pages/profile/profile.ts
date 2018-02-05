import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticationProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userProfilePhoto: string;

  constructor(private authSrv: AuthenticationProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage: ', this.authSrv.getCurrentUser().photoURL);
    this.userProfilePhoto = this.authSrv.getCurrentUser().photoURL;
  }

}
