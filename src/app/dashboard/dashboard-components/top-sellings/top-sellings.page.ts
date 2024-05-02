import { Component, OnInit } from '@angular/core';
import {Product,TopSelling} from './top-selling-data';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  selector: 'app-top-sellings',
  templateUrl: './top-sellings.page.html',
})
export class TopSellingsPage implements OnInit {

  topSelling:Product[];

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    this.topSelling=TopSelling;
  }

  ngOnInit() {
  }

}
