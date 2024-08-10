import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseauthService } from './services/firebaseauth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
    private platform: Platform,
    private firebaseauthService: FirebaseauthService,
  //private splashScreen: splashScreen,
  //private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }
  initializeApp() {
      this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
     // this.splashScreen.hide();  
      });

  }
}
