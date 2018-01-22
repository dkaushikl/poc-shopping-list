import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListsPage } from './shopping-lists';

import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    ShoppingListsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListsPage),
  ],
  providers: [
    AngularFirestore
  ]
})
export class ShoppingListsPageModule {}
