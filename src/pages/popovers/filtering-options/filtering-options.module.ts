import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilteringOptionsPage } from './filtering-options';

@NgModule({
  declarations: [
    FilteringOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilteringOptionsPage),
  ],
})
export class FilteringOptionsPageModule {}
