import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from './../home/home';

import { AuthenticationProvider, ShoppingListProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private authSrv: AuthenticationProvider, public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginGoogle() {
    this.authSrv.loginWithGoogle()
      .then(() => this.navCtrl.setRoot(HomePage))
      .catch(error => console.log('Google OAuth error: ', error))
  }

  logout() {
    this.authSrv.logout();
  }

}
