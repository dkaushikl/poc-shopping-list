import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { AlimentItem, Market } from './../../../models';
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
  alimentChecked: boolean;

  constructor(
    private marketSrv: MarketsProvider,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private shoppingListSrv: ShoppingListProvider,
    private viewCtrl: ViewController) { 
      let params = this.navParams.get('alimentToEdit') as AlimentItem;
      if(params) {
        this.alimentName = params.name;
        this.quantity = params.quantity;
        this.alimentChecked = params.checked;
        this.selectedMarketId = params.market;
      } else {
        this.quantity = '';
        this.selectedMarketId = '';
        this.alimentChecked = false;
      }
    }

  ionViewDidLoad() {
    this.markets$ = this.marketSrv.getMarkets().subscribe(
      markets => this.markets = markets
    );
  }

  addAliment() {
    this.viewCtrl.dismiss({ 
      name: this.alimentName, 
      quantity: this.quantity,
      market: this.selectedMarketId,
      checked: this.alimentChecked
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

  ionViewWillUnload() {
    this.markets$.unsubscribe();
  }

}
