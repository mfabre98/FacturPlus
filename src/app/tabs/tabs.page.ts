import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isLoggedIn: boolean = false;
  user: any;
  userName: string = "";
  isAdmin: boolean = false;

  constructor(public authService: AuthenticationService, public router: Router) {    
    let user: any = JSON.parse(localStorage.getItem('user'));
    if (user && user != "null"){
      this.isLoggedIn = true;
      debugger;
      this.user = user;
      const words = user.email.split("@");
      this.userName = words[0];
      if (user.email == "marcfabre10@gmail.com"){
        this.isAdmin = true;
      }
    }
  }

  logOut(){
    this.isLoggedIn = false;
    this.authService.SignOut();
  }

  navigateTo(route: string){
    debugger;
    this.router.navigate([route]);
  }

}
