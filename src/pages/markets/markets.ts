import { Component } from '@angular/core';
import { IonicPage, ItemSliding, ModalController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Market } from './../../models';
import { AddMarketPage } from './../modals';
import { MarketsProvider, UtilProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-markets',
  templateUrl: 'markets.html',
})
export class MarketsPage {
  markets = new Array<Market>();

  constructor(
    private marketSrv: MarketsProvider,
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private utilSrv: UtilProvider) {}

  ionViewDidLoad() {
    this.marketSrv.getMarkets().subscribe(
      docSnapshot => {
        let marketsObj = docSnapshot.payload.data();
        this.markets = Object.keys(marketsObj).map(market => marketsObj[market]);
      }
    );
  }

  addMarket() {
    let modal = this.modalCtrl.create(AddMarketPage);
    modal.onDidDismiss((data: Market) => {
      this.marketSrv.addMarket(data.name, data.color, data.location)
        .then(() => this.utilSrv.showToast('Market added successfully!'))
        .catch(e => this.utilSrv.showToast('Error: ' + e));
    });
    modal.present();
  }

  editMarket(market: Market) {
    let modal = this.modalCtrl.create(AddMarketPage, { market });
    modal.onDidDismiss((data: Market) => {
      this.marketSrv.editMarket(data)
        .then(() => this.utilSrv.showToast(`Market ${market.name} edited successfully!`))
        .catch(e => this.utilSrv.showToast('Error: ' + e));
    });
    modal.present();
  }

  deleteMarket(slidingItem: ItemSliding, market: Market) {
    this.utilSrv.showAlert(
      'Remove market', 
      `Are you sure to delete "${market.name}"?`,
      [
        { text: 'Cancel', handler: () => slidingItem.close() },
        { text: 'Remove', handler: () => {
          this.marketSrv.deleteMarket(market.name)
            .then(() => {
              slidingItem.close();
              this.utilSrv.showToast(`"${market.name}" was removed successfully!`);
            })
            .catch(e => this.utilSrv.showToast('Error: ', e));
          } 
        }
      ]
    );
  }

}
