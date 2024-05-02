import { Component, OnInit } from '@angular/core';
import { NgbNavModule, NgbNavChangeEvent, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
	selector: 'app-ngbd-nav',
	standalone: true,
	imports: [NgbNavModule, NgbDropdownModule, NgFor, NgIf, NgbAlertModule],
	templateUrl: './nav.page.html',

})
export class NgbdnavBasicPage implements OnInit {
	//  basic navs
	active = 1;

	// vertical
	active2 = 'top';

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }

  ngOnInit() {
  }

}
