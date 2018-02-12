import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { ShoppingAlimentListPage } from './shopping-aliment-list';
import { SortAlimentsPipe } from './../../pipes/sort-aliments/sort-aliments';

@NgModule({
  declarations: [
    ShoppingAlimentListPage,
    SortAlimentsPipe
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(ShoppingAlimentListPage)
  ],
  providers: [
    Camera
  ]
})
export class ShoppingAlimentListPageModule {}
