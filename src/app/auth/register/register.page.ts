import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PresentService } from 'src/app/services/present.service';
import { AuthenticationService } from "../../services/authentication.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public present: PresentService
  ) {    
  }
  ngOnInit(){}
  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      // Do something here
      this.authService.SendVerificationMail()
      this.router.navigate(['factur/verificar-correo']);
    }).catch((error) => {
      this.present.presentToast("Error en el registro de usuario.", 5000, 'danger');
      console.log(error.message)
    })
  }
}