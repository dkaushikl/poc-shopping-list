import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AlimentItem, ShoppingList } from './../../models';
import { AuthenticationProvider } from './../authentication/authentication';

@Injectable()
export class AlimentsProvider {
  userId: string;

  constructor(private authSrv: AuthenticationProvider, private afs: AngularFirestore) {
    console.log('Hello AlimentsProvider; id: ', this.authSrv.getCurrentUserId());
  }

  /**
   * 
   * @param listId 
   * @param newAliment 
   */
  addAliment(listId: string, newAliment: AlimentItem) {
    return new Promise((resolve, reject) => {
      this.afs
        .doc<any>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
        .ref
        .get()
        .then(list => {
          let aliments: Array<AlimentItem> = list.get('aliments') || [];

          // Check if exists before to add!
          if(aliments.find(a => a.name === newAliment.name)) {
            return reject('The aliment already exists!');
          }

          // No exists, add the aliment
          return list.ref.update({ 'aliments': [...aliments, newAliment] })
            .then(() => resolve(newAliment.name))
            .catch(e => {
              console.log('Error updating the list with new aliment: ', e);
              reject(e);
            });
        })
        .catch(e => {
          console.log('Error getting the list: ', e);
          reject(e);
        });
    });
  }

  /**
   * 
   * @param listId 
   * @param oldAliment 
   * @param alimentToUpdate 
   */
  updateAliment(listId: string, oldAlimentName: string, alimentToUpdate: AlimentItem) {
    return new Promise((resolve, reject) => {
      this.afs
        .doc<any>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
        .ref
        .get()
        .then(list => {
          let aliments: Array<AlimentItem> = list.get('aliments') || [];
          let alimentIndex = aliments.findIndex((a) => a.name === oldAlimentName);
          if(alimentIndex === -1) {
            return reject('No aliment found :-(');
          }
          aliments[alimentIndex] = alimentToUpdate;
          return list.ref.update({ 'aliments': [...aliments] })
            .then(() => resolve(alimentToUpdate.name))
            .catch(e => {
              console.log('Error updating aliment: ', e);
              reject(e);
            });
        })
        .catch(e => {
          console.log('Error updating the aliment: ', e);
          reject(e);
        });
    });
  }

  /**
   * 
   * @param listId 
   * @param aliment 
   */
  setAlimentState(listId: string, aliment: AlimentItem) {
    return new Promise((resolve, reject) => {
      this.afs
        .doc<any>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
        .ref
        .get()
        .then(list => {
          let aliments: Array<AlimentItem> = list.get('aliments') || [];
          let alimentIndex = aliments.findIndex((a) => a.name === aliment.name);
          if(alimentIndex === -1) {
            return reject('No aliment found :-(');
          }
          aliments[alimentIndex].checked = aliment.checked;
          return list.ref.update({ 'aliments': [...aliments] })
            .then(() => resolve())
            .catch(e => {
              console.log('Error updating state: ', e);
              reject(e);
            });
        })
        .catch(e => {
          console.log('Error updating state: ', e);
          reject(e);
        });
    });
  }

  /**
   * 
   * @param listId 
   * @param state 
   */
  setBulkAlimentState(listId: string, state: boolean) {
    return new Promise((resolve, reject) => {
      this.afs
        .doc<any>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
        .ref
        .get()
        .then(list => {
          let aliments: Array<AlimentItem> = list.get('aliments') || [];
          let bulkUpload = aliments.map(aliment => {
            aliment.checked = state;
            return aliment;
          });
          return list.ref.update({ 'aliments': [...bulkUpload] })
            .then(() => resolve())
            .catch(e => {
              console.log('Error bulk updating state: ', e);
              reject(e);
            });
        })
        .catch(e => {
          console.log('Error bulk updating state: ', e);
          reject(e);
        });
    });
  }

  /**
   * 
   * @param listId 
   * @param aliment 
   */
  deleteAlimentFromShoppingList(listId: string, aliment: AlimentItem) {
    return new Promise((resolve, reject) => {
      this.afs
        .doc<AlimentItem>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
        .ref
        .get()
        .then(list => {
          let aliments: Array<AlimentItem> = list.get('aliments') || [];
          let alimentIndex = aliments.findIndex((a) => a.name === aliment.name);
          aliments.splice(alimentIndex, 1);
          return list.ref.update({ 'aliments': [...aliments] })
            .then(() => resolve(aliment.name))
            .catch(e => {
              console.log('Error deleting the list with new aliment: ', e);
              reject(e);
            });
        })
        .catch(e => {
          console.log('Error deleting the list: ', e);
          reject(e);
        });
    });
  }

}
