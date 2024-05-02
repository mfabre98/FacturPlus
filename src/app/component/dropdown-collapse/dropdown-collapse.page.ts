import { Component, OnInit } from '@angular/core';
import {
  NgbDropdownModule,
  NgbModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  selector: 'app-dropdown-basic',
  standalone: true,
  imports: [NgbDropdownModule, NgbModule, NgbCollapseModule],
  templateUrl: './dropdown-collapse.page.html',
})
export class NgbdDropdownBasicPage implements OnInit {
  // This is for the collapse example
  public isCollapsed = false;
  public isCollapsed2 = false;

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }

  ngOnInit() {
  }

}
