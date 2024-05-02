import { Component, OnInit } from '@angular/core';
import { Feeds,Feed } from './feeds-data';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
})
export class FeedsPage implements OnInit {

  feeds:Feed[];

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    this.feeds = Feeds;
  }

  ngOnInit() {
  }

}
