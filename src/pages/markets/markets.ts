import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-markets',
  templateUrl: 'markets.html',
})
export class MarketsPage {

  markets: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketsPage');
    this.markets = [
      { name: 'Mercadona', color: '#00FF00' },
      { name: 'Lidl', color: '#0000FF' },
      { name: 'Dia', color: '#FF0000' }
    ];
  }

}
