import { BrowserModule } from '@angular/platform-browser';
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

// Modules
import { AddNewListPageModule } from '../pages/shopping-lists/add-new-list/add-new-list.module';

// Pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ShoppingListsPage } from '../pages/shopping-lists/shopping-lists';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';

// Providers
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ShoppingListsPage,
    ConfigurationPage,
    ProfilePage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    AddNewListPageModule,
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
    ShoppingListsPage,
    ConfigurationPage,
    ProfilePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider
  ]
})
export class AppModule {}
