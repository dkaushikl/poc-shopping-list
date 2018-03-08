import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';

@Injectable()
export class AnalyticsProvider {

  constructor(private firebaseSrv: Firebase) { }

  logEvent(page: string, event: string = 'page_view') {
    return this.firebaseSrv.logEvent(event, { page });
  }

  setScreenName(screenName: string) {
    return this.firebaseSrv.setScreenName('Home!');
  }

}
