import { AfterViewInit, Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { PresentService } from "../../services/present.service";
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;
declare var anime: any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public present: PresentService
  ) {
    if (!StorageService.readStorage('reload-login-page')){
      StorageService.saveStorage('reload-login-page', true)
      window.location.reload();
    } else {
      StorageService.deleteStorage('reload-login-page')
    }
  }
  ngAfterViewInit() {
    var current = null;
    document.querySelector('#email').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
    document.querySelector('#password').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
    document.querySelector('#submit').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
  }
  logIn(email, password) {
    if (email.value && email.value != "" && password.value && password.value != ""){
      this.authService.SignIn(email.value, password.value)
        .then((res) => {
          if(this.authService.isEmailVerified) {
            this.present.presentToast("Inicio de sesión correcto.");
            this.router.navigate(['dashboard']);          
          } else {
            this.present.presentToast("Error. Correo no verificado.", 5000, 'danger');
            return false;
          }
        }).catch((error) => {
          $("#email").val("");
          $("#password").val("");
          if (error.message.includes("(auth/invalid-email)")){
            this.present.presentToast("Error. No es un correo valido.", 5000, 'danger');
          } else if (error.message.includes("(auth/user-not-found)")){
            this.present.presentToast("Error. No existe ninguna cuenta con ese correo.", 5000, 'danger');
          } else if (error.message.includes("(auth/wrong-password)")){
            this.present.presentToast("Error. Contraseña incorrecta.", 5000, 'danger');
          } else {
            this.present.presentToast(error.message, 5000, 'danger');
          }
        });
    } else {
      this.present.presentToast("Error. Se debe indicar usuario y contraseña.", 5000, 'danger');
    }
  }

  gotoRegister(){
    this.router.navigate(['/register']);
  }
}