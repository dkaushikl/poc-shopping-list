import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingAlimentListPage } from './shopping-aliment-list';

@NgModule({
  declarations: [
    ShoppingAlimentListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingAlimentListPage),
  ],
})
export class ShoppingAlimentListPageModule {}
