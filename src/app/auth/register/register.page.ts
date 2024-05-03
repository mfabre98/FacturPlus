import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PresentService } from 'src/app/services/present.service';
import { AuthenticationService } from "../../services/authentication.service";
import { StorageService } from 'src/app/services/storage.service';
declare var anime: any; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showRegisterButton = true;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public present: PresentService
  ) {
    StorageService.deleteStorage('user');
    if (!StorageService.readStorage('reload-register-page')){
      StorageService.saveStorage('reload-register-page', true)
      window.location.reload();
    } else {
      StorageService.deleteStorage('reload-register-page')
    }
  }
  ngOnInit(){
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

  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      this.showRegisterButton = false;
      this.present.presentToast("Se ha enviado correo de verificación de cuenta al correo indicado.", 2500);
      setTimeout(() => {
        StorageService.deleteStorage('user');
        this.router.navigate(['login']);
        this.authService.SendVerificationMail()
      }, 10000);
    }).catch((error) => {
      this.present.presentToast("Error en el registro de usuario.", 5000, 'danger');
      console.log(error.message)
    })
  }
}