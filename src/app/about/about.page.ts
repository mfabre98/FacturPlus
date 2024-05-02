import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
declare var $:any;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }

  ngOnInit() {
  }

}
