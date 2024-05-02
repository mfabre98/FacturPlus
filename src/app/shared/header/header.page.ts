import { NgIf } from '@angular/common';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScreensizeService } from 'src/app/services/screensize.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[NgbDropdownModule, NgIf],
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  isDesktop: boolean;
  isLoggedIn: boolean = false;
  tokenIsValid: boolean = false;
  userSession;
  auth2: any;
  secretKey: string ='AIzaSyCR0qhQ-y47fTeBQnVtCK4Yly5Sp0GH2AM.apps.googleusercontent.com';

  @ViewChild('loginRef') loginElement!: ElementRef;

  constructor(public router: Router, private modalService: NgbModal, private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) window.location.reload();
      this.isDesktop = isDesktop;
    });
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-warning',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }];

  ngOnInit(): void {
    if (!this.router.url.includes('/map')){
      if (StorageService.readStorage("reloadPage")){
        StorageService.deleteStorage("reloadPage")
        document.location.reload();
      }
    }
    this.loadPage()
  }

  async loadPage(){
    let userSession = StorageService.readStorage("user");
    if (userSession && userSession.emailVerified) {
      this.userSession = userSession;      
      const words = this.userSession.email.split("@");
      this.userSession.username = words[0];
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      StorageService.deleteStorage('user');
      this.router.navigate(['login']);
    }
  }

  // googleAuthSDK() {
  //   (<any>window)['googleSDKLoaded'] = () => {
  //     (<any>window)['gapi'].load('auth2', () => {
  //       this.auth2 = (<any>window)['gapi'].auth2.init({
  //       client_id: this.secretKey,
  //       plugin_name:'login',
  //       cookiepolicy: 'single_host_origin',
  //       scope: 'https://www.googleapis.com/auth/userinfo.profile'
  //       });
  //     });
  //   }

  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement('script');
  //     js.id = id;
  //     js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
  //     fjs?.parentNode?.insertBefore(js, fjs);
  //   }(document, 'script', 'google-jssdk'));
  // }

  // async checkTokenValidity(): Promise<boolean> {
  //   try {
  //     const accessToken = this.userSession.token;
  //     const response = await fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + accessToken);

  //     if (response.status === 200) {
  //       return true;
  //     } else {
  //       console.error('Token incorrecto', response.statusText);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return false;
  //   }
  // }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  // callLogin() {
  //   let Base = this;
  //   this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
  //     async (googleAuthUser: any) => {
  //       let usr: any = {
  //         "id": 0,
  //         "complete": "",
  //         "mail": "",
  //         "token": "",
  //         "imageUrl": "",
  //         "company": ""
  //       }
  //       let token = googleAuthUser.getAuthResponse().access_token;
  //       usr.token = token;
  //       let user = googleAuthUser.getBasicProfile();
  //       usr.complete = user.getGivenName() + user.getFamilyName();
  //       usr.imageUrl = user.getImageUrl();
  //       let claves = Object.keys(user);
  //       for(let i=0; i< claves.length; i++){
  //         let clave = claves[i];
  //         if (Base.validateEmail(user[clave])){
  //           usr.mail = user[clave]
  //         }
  //       }

  //       StorageService.saveStorage("user", usr);
  //       window.location.reload();

  //       // Base.sqlService.getUserData(usr.mail).then(result => {
  //       //   if (result && result[0]){
  //       //     usr.id = result[0].id;
  //       //     usr.complete = result[0].complete;
  //       //     usr.company = result[0].company;
  //       //     StorageService.saveStorage("user", usr);
  //       //     window.location.reload();
  //       //   } else {
  //       //     window.location.reload();
  //       //   }
  //       // }).catch(async (err) => {
  //       //   window.location.reload();
  //       // });
  //     }, (error: any) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     });
  //     document.getElementById("signinButton").click()
  // }

  // validateEmail (email) {
  //   return email.match(
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // }

  callLogOut() {
    this.isLoggedIn = false;
    StorageService.deleteStorage('user');
    this.router.navigate(['login']);
  }

  gotoConfiguration() {
    this.router.navigate(['/component/configuration']);
  }
}

