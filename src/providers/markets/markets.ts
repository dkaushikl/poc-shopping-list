import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MarketsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MarketsProvider Provider');
  }

  getMarkets() {

  }

  addMarket() {

  }

  editMarket() {

  }

  deleteMarket() {
    
  }

}
