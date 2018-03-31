import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UtilProvider } from './../utils/util';

@Injectable()
export class CameraUnifiedProvider {

  constructor(private cameraSrv: Camera, private utilSrv: UtilProvider) { }

  uploadFile() {
    if(this.utilSrv.isNativePlatform()) {
      return this.uploadNativeFile();
    } else {

    }
  }
  
  takeNativePicture() {
    const opts : CameraOptions = {
      correctOrientation: true,
      destinationType: this.cameraSrv.DestinationType.DATA_URL,
      encodingType: this.cameraSrv.EncodingType.PNG,
      mediaType: this.cameraSrv.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      sourceType: this.cameraSrv.PictureSourceType.CAMERA,
      quality: 50
    }
    
    return new Promise((resolve, reject) => {
      this.cameraSrv.getPicture(opts) 
        .then((imageData) => resolve(`data:image/png;base64,${imageData}`))
        .catch((error) => reject(error));
    });
  }

  private uploadNativeFile() {
    return new Promise((resolve, reject) => {
      this.cameraSrv.getPicture({ sourceType: this.cameraSrv.PictureSourceType.PHOTOLIBRARY }) 
        .then((imageData) => resolve(`data:image/jpeg;base64,${imageData}`))
        .catch((error) => reject(error));
    });
  }

}
