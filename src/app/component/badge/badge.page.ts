import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  templateUrl: './badge.page.html'
})
export class BadgePage implements OnInit {

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }

  ngOnInit() {
  }

}
