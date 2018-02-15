import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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

// Modules
import { ALL_PAGE_MODULES } from './../pages';
import { ALL_MODAL_MODULES } from './../pages/modals';
import { ALL_POPOVER_MODULES } from './../pages/popovers';

// Pages
import { MyApp } from './app.component';

// Providers
import { 
  AlimentsProvider, AuthenticationProvider, CameraUnifiedProvider, MarketsProvider, 
  ShoppingListProvider, UtilProvider, UsersProvider 
} from '../providers';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
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
    AuthenticationProvider,
    CameraUnifiedProvider,
    GooglePlus,
    MarketsProvider,
    ShoppingListProvider,
    SplashScreen,
    StatusBar,
    UtilProvider,
    UsersProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
