import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { PipesModules } from './../../pipes/pipes.module';
import { ShoppingAlimentListPage } from './shopping-aliment-list';

@NgModule({
  declarations: [
    ShoppingAlimentListPage
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(ShoppingAlimentListPage),
    PipesModules
  ],
  providers: [
    Camera
  ]
})
export class ShoppingAlimentListPageModule {}
