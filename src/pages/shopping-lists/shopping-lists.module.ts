import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListsPage } from './shopping-lists';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    ShoppingListsPage
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(ShoppingListsPage),
  ],
  providers: [
    AngularFirestore
  ]
})
export class ShoppingListsPageModule {}
