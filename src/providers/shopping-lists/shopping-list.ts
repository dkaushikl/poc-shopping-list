import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShoppingListProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ShoppingListProvider Provider');
  }

  getAllLists() {

  }

  getSharedLists() {

  }

  createNewList() {

  }

  editList() {

  }

  deleteList() {
    
  }

}
