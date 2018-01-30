import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filtering-options',
  templateUrl: 'filtering-options.html',
})
export class FilteringOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilteringOptionsPage');
  }

  close(option: string) {
    this.viewCtrl.dismiss(option);
  }

}
