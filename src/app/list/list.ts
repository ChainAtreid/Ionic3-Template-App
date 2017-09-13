import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { UserModel } from '../core/user.model'
import { TeaModel } from '../core/tea.model' 

import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public userProfile: UserModel;
  public uid: string = "";
  public effect: string = "";
  public taste: string = "";
  public teas:TeaModel[];

  constructor(
    public navCtrl: NavController, 
    public db: DataService,
    public authService: AuthService,
    public alertCtrl: AlertController
  ) {
    
  }

  ionViewDidLoad() {
    this.authService.getFullProfile().subscribe((user) => {
      this.userProfile = user;
      this.uid = user.uid;
    });
    this.initializeTeas();
  }

  initializeTeas() {
    this.db.listAll("teas", {
      orderByChild: "name"
    }).subscribe(teas =>
      {
        this.teas = teas;
        console.log("CHANGED")
        this.filterTeas(this.effect);
        this.filterTeasbytaste(this.taste);
      }
    )
  }

  refreshTeas() {
    this.db.listAll("teas", {
      orderByChild: "name"
    }).subscribe(teas =>
      {
        this.teas = teas;
      }
    )
  }

  filterTeas(ev: any) {
    if (ev && ev.trim() != '') {
      this.teas = this.teas.filter((tea) => {
        return tea.effects.indexOf(ev) != -1;
  
      })
    } else {
      this.refreshTeas();
    }
  }
  filterTeasbytaste(ev: any) {
    if (ev && ev.trim() != '') {
      this.teas = this.teas.filter((tea) => {
        return tea.taste.indexOf(ev) != -1;
  
      })
    } else {
      this.refreshTeas();
    }
  }

  logout() {
    this.authService.signOut().then(() => this.navCtrl.setRoot('AuthPage'));
  }

  showDetail(tea) { 
    let alert = this.alertCtrl.create({
      title: tea.name,
      subTitle: tea.taste + [' '] + tea.effects, 
      buttons: ['Dismiss']
    });

    alert.present();

  }
  
}