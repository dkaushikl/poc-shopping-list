import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-aliment-options',
  templateUrl: 'aliment-options.html',
})
export class AlimentOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentOptionsPage');
  }

  close(option: string) {
    this.viewCtrl.dismiss(option);
  }

}
