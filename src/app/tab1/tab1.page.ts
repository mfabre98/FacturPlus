import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { TabsPage } from "../tabs/tabs.page";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public authService: AuthenticationService, public tabs: TabsPage) {
    if (this.authService.isLoggedIn){
      this.tabs.isLoggedIn = true;
    }
  }

  ngOnInit(){

  }

}
