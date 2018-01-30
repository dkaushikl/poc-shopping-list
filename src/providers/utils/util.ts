import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilProvider {

  constructor(private toastCtrl: ToastController) {
    console.log('Hello UtilProvider Provider');
  }

  showToast(message: string, duration = 3000) {
    this.toastCtrl.create({ message, duration }).present();
  }

}
