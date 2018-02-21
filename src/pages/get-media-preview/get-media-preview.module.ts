import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { WebCamModule } from 'ack-angular-webcam';

import { GetMediaPreviewPage } from './get-media-preview';

@NgModule({
  declarations: [
    GetMediaPreviewPage
  ],
  imports: [
    IonicPageModule.forChild(GetMediaPreviewPage),
    WebCamModule
  ],
  exports: [
    GetMediaPreviewPage
  ]
})
export class GetMediaPreviewPageModule {}
