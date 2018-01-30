import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlimentOptionsPage } from './aliment-options';

@NgModule({
  declarations: [
    AlimentOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AlimentOptionsPage),
  ],
})
export class AlimentOptionsPageModule {}
