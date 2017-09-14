import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { detailPage } from './detail';

@NgModule({
  imports: [
    SharedModule,
    IonicPageModule.forChild(detailPage)
  ],
  declarations: [
    detailPage
  ],
  entryComponents: [
    detailPage
  ]
})
export class detailPageModule { }
