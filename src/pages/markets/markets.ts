import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Market } from './../../models';
import { AddMarketPage } from './../modals';

import { MarketsProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-markets',
  templateUrl: 'markets.html',
})
export class MarketsPage {

  markets: Array<Market>;

  constructor(
    private marketSrv: MarketsProvider,
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketsPage');
    this.marketSrv.getMarkets().subscribe(
      (markets) => {
        this.markets = markets;
        console.log('Markets: ', this.markets);
      }
    );
  }

  addMarket() {
    this.modalCtrl.create(AddMarketPage).present();
  }

  editMarket() {
    this.marketSrv.editMarket();
  }

  deleteMarket() {
    this.marketSrv.deleteMarket();
  }

}
