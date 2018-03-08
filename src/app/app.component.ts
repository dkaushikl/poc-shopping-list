import { Component, ViewChild } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs/Subscription';

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
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  userLogged: boolean = false;
  userData: any = null;
  rootPage: any = LoginPage;
  pages: Array<Page>;
  firebaseSubscription: Subscription;;

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

        if(this.utilSrv.isNativePlatform() && userLoggedState && userLoggedState.uid) {
          this.messagingSrv.getPermission();
          this.messagingSrv.receiveMessage();

          // Firebase notification subscription
          // ToDo: Check if the subscription have to be unsubscribed
          /*this.firebaseSubscription = this.firebaseSrv.onNotificationOpen().subscribe(
            (notification) => {
              console.log('Notification! ', notification);
              if(notification.tap) {
                console.log('background');
              } else {
                console.log('foreground');
              }
            }, 
            (error) => console.log('Error in notification: ', error)
          );*/
        } else if(this.utilSrv.isNativePlatform() && (!userLoggedState || !userLoggedState.uid)) {
          /*if(this.firebaseSubscription)
            this.firebaseSubscription.unsubscribe();
          this.firebaseSubscription = null;*/
        }
      },
      (e) => console.log('constructor error: ', e) 
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

  initializeApp() {
    this.platform.ready().then(() => {
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
