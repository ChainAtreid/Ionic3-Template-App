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

import { ModalController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class detailPage {

  public userProfile: UserModel;
  public uid: string = "";
  public tea: TeaModel;
  public teaId: string;
  public like: boolean;
  public teaPreference: any;

  constructor(
    public navCtrl: NavController, 
    public db: DataService,
    public authService: AuthService,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    
  }

  ionViewDidLoad() {
    this.authService.getFullProfile().subscribe((user) => {
      this.userProfile = user;
      this.uid = user.uid;
    });
    this.teaId = this.navParams.get("tea");
    this.initializeTea()
  }

  initializeTea() {
    this.db.get("teas", this.teaId).subscribe(tea =>
      {
        this.tea = tea;
      }
    )

  }

  toggleLike(like) {
    this.db.get("tea-preferences", this.uid).flatMap((teaPreference) =>
      {
        let teas = [ this.teaId ];
        console.log(teaPreference);
        if (teaPreference && teaPreference.teas)
          teas = teaPreference.teas.concat(this.teaId);
        console.log(teas);
        return this.db.update("tea-preferences", this.uid, {
          user: this.uid,
          teas: teas,
        })
      }
    )

  }

  close() {
    this.viewCtrl.dismiss();
  }
 
  
}