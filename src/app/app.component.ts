import { Component, OnInit, ViewChild } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
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

import { AuthenticationProvider, MessagingProvider, UtilProvider } from './../providers';

import { Page } from './../models';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  userLogged: boolean = false;
  userData: any = null;
  rootPage: any = LoginPage;
  pages: Array<Page>;

  constructor(
      private authSrv: AuthenticationProvider,
      private firebaseSrv: Firebase,
      private messagingSrv: MessagingProvider,
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      private utilSrv: UtilProvider
  ) {
    this.authSrv.getUserObservable().subscribe(
      (userLoggedState) => {
        // Update local variables according to the new authState
        this.userLogged = (userLoggedState) ? true : false;
        this.userData = (userLoggedState) ? userLoggedState : null;

        // Navigate to the proper page after authState change
        this.nav.setRoot((this.userLogged) ? HomePage : LoginPage);
      },
      (e) => console.log('constructor error: ', e) 
    );

    // Firebase notification subscription
    // ToDo: Check if the subscription have to be unsubscribed
    this.firebaseSrv.onNotificationOpen().subscribe(
      (notification) => {
        console.log('Notification! ', notification);
        if(notification.tap) {
          console.log('background');
        } else {
          console.log('foreground');
        }
      }, 
      (error) => console.log('Error in notification: ', error)
    );

    // Initialize app
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
    if(!this.platform.is('cordova') && !this.platform.is('mobile')) {
      console.log('Entrando por ngOninit() + if()');
      this.messagingSrv.getPermission();
      this.messagingSrv.receiveMessage();
    }
    console.log('MsgReceived >>>> ', this.messagingSrv.messages$);
  }

  ionViewDidLoad() {
    console.log('Sending analytics...');
    //
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova') && this.platform.is('mobile')) {
        this.firebaseSrv.getToken()
          .then(t => this.utilSrv.showToast('FCM token: ' + JSON.stringify(t)))
          .catch(e => this.utilSrv.showToast('Error getToken: ' + JSON.stringify(e)));

        this.firebaseSrv.hasPermission()
          .then(isEnabled => console.log('Has Permission? ', isEnabled))
          .catch(error => this.utilSrv.showToast('Error has perm? ' + JSON.stringify(error)));

        if(this.platform.is('ios')) {
          console.log('Granting permissions for iOS...');
          this.firebaseSrv.grantPermission()
            .then(t => console.log('Granted', t))
            .catch(e => this.utilSrv.showToast('ErrorP: ' + JSON.stringify(e)));
        }

        this.firebaseSrv.logEvent('App Opened', { foo: 1, bar: Math.random() })
          .then()
          .catch(error => this.utilSrv.showToast('Error event: ' + JSON.stringify(error)))
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any ihigher level native things you might need.
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
    this.platform.ready().then(() => {
      this.firebaseSrv.unregister().catch(error => this.utilSrv.showToast('Error unregistering: ' + error));
    });
  }
}
