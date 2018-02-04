import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { FilterCriteria } from './../../../models';

@IonicPage()
@Component({
  selector: 'page-filtering-options',
  templateUrl: 'filtering-options.html',
})
export class FilteringOptionsPage {
  itemsVisibility: string;
  sortingCriteria: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    let currentValues = this.navParams.get('currentValues') as FilterCriteria;
    this.itemsVisibility = currentValues.visibility || 'show';
    this.sortingCriteria = currentValues.sorting || 'none';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilteringOptionsPage');
  }

  close() {
    this.viewCtrl.dismiss({
      sorting: this.sortingCriteria,
      visibility: this.itemsVisibility
    });
  }

}
