import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
    this.authSrv.loginWithGoogle();
  }

  logout() {
    this.authSrv.logout();
  }

}
