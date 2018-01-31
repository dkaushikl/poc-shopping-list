import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { Market } from './../../../models';
import { MarketsProvider, ShoppingListProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-aliment',
  templateUrl: 'add-aliment.html',
})
export class AddAlimentPage {
  markets$: Subscription;
  alimentName: string;
  markets: Array<Market>;
  quantity: string;
  selectedMarketId: string;

  constructor(
    private marketSrv: MarketsProvider,
    private navCtrl: NavController, 
    private shoppingListSrv: ShoppingListProvider,
    private viewCtrl: ViewController) { }

  ionViewDidLoad() {
    this.markets$ = this.marketSrv.getMarkets().subscribe(
      markets => this.markets = markets
    );
  }

  addAliment() {
    this.viewCtrl.dismiss({ 
      name: this.alimentName, 
      quantity: this.quantity,
      market: this.getSelectedmarket()
    });
  }

  getSelectedmarket() {
    let m = this.markets.find((m) => m.id === this.selectedMarketId);
    return {
      name: m.name,
      color: m.color
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  ionViewWillUnload() {
    this.markets$.unsubscribe();
  }

}
