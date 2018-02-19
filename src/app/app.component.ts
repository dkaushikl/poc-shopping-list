import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MarketsPage } from '../pages/markets/markets';
import { ShoppingListsPage } from '../pages/shopping-lists/shopping-lists';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';

import { AuthenticationProvider, MessagingProvider } from './../providers';

import { Page } from './../models';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  userLogged: boolean = false;
  rootPage: any = LoginPage;
  pages: Array<Page>;

  constructor(
      private authSrv: AuthenticationProvider, 
      private messagingSrv: MessagingProvider,
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen
  ) {
    this.authSrv.getUserObservable().subscribe(
      (userLogged) => {
        this.userLogged = (userLogged) ? true : false;
        this.nav.setRoot((userLogged) ? HomePage : LoginPage);
      },
      (e) => console.log('constructor error: ', e) 
    );
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Markets', component: MarketsPage, icon: 'map' },
      { title: 'Shopping lists', component: ShoppingListsPage, icon: 'basket' },
      { title: 'Configuration', component: ConfigurationPage, icon: 'build' },
      { title: 'Profile', component: ProfilePage, icon: 'contact' },
      { title: 'About', component: AboutPage, icon: 'information-circle' }
    ];
  }

  ngOnInit() {
    this.messagingSrv.getPermission();
    this.messagingSrv.receiveMessage();
    console.log('MsgReceived >>>> ', this.messagingSrv.messages$);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setHomePage() {
    this.nav.setRoot(HomePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.authSrv.logout();
  }
}
