import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddAlimentPage } from './add-aliment';

@NgModule({
  declarations: [
    AddAlimentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAlimentPage),
  ],
  exports: [
    AddAlimentPage
  ]
})
export class AddAlimentPageModule {}
