import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ShoppingListsPage } from '../pages/shopping-lists/shopping-lists';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';

import { AuthServiceProvider } from './../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  userLogged: boolean = false;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any, icon: string, logged: boolean }>;

  constructor(
      private authSrv: AuthServiceProvider, 
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen
  ) {
    this.authSrv.subscribeToUserAuthState().subscribe(
      (u) => {
        this.userLogged = (u) ? true : false;
        console.log('constructor: ' + ((u) ? 'usuario logado!' : 'usuario NO logado'), u);
      },
      (e) => console.log('constructor error: ', e) 
    );
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home', logged: false },
      { title: 'Shopping lists', component: ShoppingListsPage, icon: 'list-box', logged: false },
      { title: 'Configuration', component: ConfigurationPage, icon: 'build', logged: false },
      { title: 'Profile', component: ProfilePage, icon: 'contact', logged: false },
      { title: 'About', component: AboutPage, icon: 'information-circle', logged: false }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
