import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Firebase
import { firebaseConfig } from './../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

// Modules
import { ALL_PAGE_MODULES } from './../pages';
import { ALL_MODAL_MODULES } from './../pages/modals';
import { ALL_POPOVER_MODULES } from './../pages/popovers';

// Pages
import { MyApp } from './app.component';

// Providers
import { 
  AlimentsProvider, AnalyticsProvider, AttachmentsProvider, AuthenticationProvider, CameraUnifiedProvider, 
  MarketsProvider, MessagingProvider, ShoppingListProvider, UtilProvider, UsersProvider 
} from '../providers';
import {  } from '../providers/analytics/analytics';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserModule,
    ...ALL_PAGE_MODULES,
    ...ALL_MODAL_MODULES,
    ...ALL_POPOVER_MODULES,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AlimentsProvider,
    AnalyticsProvider,
    AttachmentsProvider,
    AuthenticationProvider,
    CameraUnifiedProvider,
    Firebase,
    GooglePlus,
    MarketsProvider,
    MessagingProvider,
    ShoppingListProvider,
    SplashScreen,
    StatusBar,
    UtilProvider,
    UsersProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
