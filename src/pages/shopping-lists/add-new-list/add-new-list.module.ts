import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddNewListPage } from './add-new-list';

@NgModule({
  declarations: [
    AddNewListPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewListPage),
  ],
  exports: [
    AddNewListPage
  ]
})
export class AddNewListPageModule {}
