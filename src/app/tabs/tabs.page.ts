import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isLoggedIn: boolean = false;

  constructor() {    
    const user = localStorage.getItem('user');
    if (user){
      this.isLoggedIn = true;
    }
  }

}
