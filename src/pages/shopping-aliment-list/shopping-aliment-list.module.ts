import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SortAlimentsPipe } from './../../pipes/sort-aliments/sort-aliments';

import { ShoppingAlimentListPage } from './shopping-aliment-list';

@NgModule({
  declarations: [
    ShoppingAlimentListPage,
    SortAlimentsPipe
  ],
  imports: [
    IonicPageModule.forChild(ShoppingAlimentListPage)
  ],
})
export class ShoppingAlimentListPageModule {}
