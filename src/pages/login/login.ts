import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { HomePage } from './../home/home';
import { AuthenticationProvider, ShoppingListProvider } from './../../providers';

import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private authSrv: AuthenticationProvider, 
    private cameraSrv: Camera, 
    private googlePlusSrv: GooglePlus,
    public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithGoogle() {
    this.authSrv.loginWithGoogle()
      .then((r) => {
        console.log('R: ', r);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => console.log('Google error: ', error));
  }

  logout() {
    this.authSrv.logout();
  }

}
