import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Market } from './../../../models';
import { MarketsProvider, UtilProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-market',
  templateUrl: 'add-market.html',
})
export class AddMarketPage {
  marketId: string;
  marketName: string;
  marketColor: string;
  marketLocation: string;
  editMode: boolean;

  constructor(
      private marketSrv: MarketsProvider, 
      public navCtrl: NavController, 
      public navParams: NavParams,
      private utilSrv: UtilProvider,
      private viewCtrl: ViewController) { 
    let params = this.navParams.get('market');
    if(params) {
      this.editMode = true;
      this.marketId = params.name;
      this.marketName = params.name;
      this.marketColor = params.color;
      this.marketLocation = params.location;
    } else {
      this.editMode = false;
      this.marketName = '';
      this.marketColor = '';
      this.marketLocation = '';
    }
  }

  ionViewDidLoad() { }

  addNewMarket() {
    this.viewCtrl.dismiss({
      name: this.marketName,
      color: this.marketColor,
      location: this.marketLocation
    });
  }

  editMarket() {
    this.viewCtrl.dismiss({
      id: this.marketId,
      name: this.marketName,
      color: this.marketColor,
      location: this.marketLocation
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

}
