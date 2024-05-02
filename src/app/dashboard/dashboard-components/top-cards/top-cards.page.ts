import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.page.html',
})
export class TopCardsPage implements OnInit {

  topcards:topcard[];

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    this.topcards=topcards;
  }

  ngOnInit() {
  }

}
