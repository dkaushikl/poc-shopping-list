import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Firebase
import { firebaseConfig } from './../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

// Pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MarketsPage } from '../pages/markets/markets';
import { ShoppingListsPage } from '../pages/shopping-lists/shopping-lists';
import { ShoppingAlimentListPage } from '../pages/shopping-aliment-list/shopping-aliment-list';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';

// Modals & Popovers
import { ALL_MODAL_MODULES } from './../pages/modals';
import { ALL_POPOVER_MODULES } from './../pages/popovers';

// Providers
import { 
  AlimentsProvider, AuthenticationProvider, MarketsProvider, ShoppingListProvider, UtilProvider 
} from '../providers';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    MarketsPage,
    ShoppingListsPage,
    ShoppingAlimentListPage,
    ConfigurationPage,
    ProfilePage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ...ALL_MODAL_MODULES,
    ...ALL_POPOVER_MODULES,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    MarketsPage,
    ShoppingListsPage,
    ShoppingAlimentListPage,
    ConfigurationPage,
    ProfilePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlimentsProvider,
    AuthenticationProvider,
    MarketsProvider,
    ShoppingListProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilProvider,
  ]
})
export class AppModule {}
