import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { WebCamComponent } from 'ack-angular-webcam';

import { AttachmentsProvider, UtilProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-get-media-preview',
  templateUrl: 'get-media-preview.html',
})
export class GetMediaPreviewPage {
  listId: string;
  options: any = {};
  webcam: WebCamComponent;
  preview: string;

  constructor(
      private attachmentSrv: AttachmentsProvider,
      private loadingCtrl: LoadingController, 
      public navCtrl: NavController, 
      private navParams: NavParams,
      private utilSrv: UtilProvider) { 
    this.listId = this.navParams.get('listId');
    this.options = {
      audio: false,
      video: true,
      cameraType: 'back'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetMediaPreviewPage');
  }

  genBase64(){
    console.log('Getting base64!');
    this.webcam.getBase64()
      .then(imageBase64 => {
        this.preview = imageBase64;
      })
      .catch(e => console.error(e));
  }
 
  onCamError(error) {
    this.utilSrv.showToast('Error initializing WebCam: ' + JSON.stringify(error));
    this.navCtrl.pop();
  }
 
  onCamSuccess() { }

  uploadPicture() {
    let message = `Uploading at XXX%. Please, wait...`;
    let uploadProgressIndicator = this.loadingCtrl.create({
      content: message.replace('XXX', "0"),  // 'Uploading at 0%. Please, wait...'
      spinner: 'dots'
    });
    uploadProgressIndicator.present()
      .then(() => { 
        this.attachmentSrv.uploadAttachmentPictureToStorage(this.listId, this.preview).subscribe(
          (percent) => uploadProgressIndicator.data.content = message.replace('XXX', percent.toFixed(0)),
          (error) => {
            this.utilSrv.showToast('Error uploading picture: ' + JSON.stringify(error));
            uploadProgressIndicator.dismiss();
            this.preview = null;
          },
          () => {
            this.utilSrv.showToast('File upload successfully!');
            uploadProgressIndicator.dismiss();
            this.navCtrl.pop();
          }
        );
      })
      .catch((error) => {});
  }

  cancel() {
    this.navCtrl.pop();
  }

}
