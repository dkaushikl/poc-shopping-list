import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filtering-options',
  templateUrl: 'filtering-options.html',
})
export class FilteringOptionsPage {
  itemsVisibility: string;
  sortingCriteria: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilteringOptionsPage');
    this.itemsVisibility = 'show';
    this.sortingCriteria = 'none';
  }

  close() {
    this.viewCtrl.dismiss({
      sorting: this.sortingCriteria,
      visibility: this.itemsVisibility
    });
  }

}
