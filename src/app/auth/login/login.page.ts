import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { PresentService } from "../../services/present.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public present: PresentService
  ) {
    const user = localStorage.getItem('user');
    if (user){
      this.router.navigate(['factur']);
    }
  }
  ngOnInit() {}
  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        let r = res
        if(this.authService.isEmailVerified) {
          window.location.reload();
          this.router.navigate(['factur']);          
        } else {
          this.present.presentToast("Error. Correo no verificado.", 5000, 'danger');
          return false;
        }
      }).catch((error) => {
        window.location.reload();
      })
  }
}