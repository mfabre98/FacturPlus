import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  templateUrl: 'card.page.html',
  standalone: true,
  imports: [IonicModule],
})
export class CardsPage implements OnInit {

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }

  ngOnInit() {
  }

}
