import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddMarketPage } from './add-market';

@NgModule({
  declarations: [
    AddMarketPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMarketPage),
  ],
  exports: [
    AddMarketPage
  ]
})
export class AddMarketPageModule {}
