import { Injectable } from '@angular/core';
import { AlertController, ToastController, PopoverController } from '@ionic/angular';
import * as forge from 'node-forge';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class PresentService {

    continueAfterQuestion: boolean = false;
    roleMessage: string = "";

  constructor(private alertController: AlertController, private toastController: ToastController, public popoverController: PopoverController) { }

  async presentToast(message: string, duration=1500, color='success') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            this.continueAfterQuestion = false;
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: () => {
            this.continueAfterQuestion = true;
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

//   openPopover() {
//     const ev = {
//       target: {
//         getBoundingClientRect: () => {
//           return {
//             left: 5
//           };
//         }
//       }
//     };
//     this.presentPopover(ev);
//   }

//   async presentPopover(ev: any) {
//     const popover = await this.popoverController.create({
//       component: PopoverComponent,
//       cssClass: 'custom-popover',
//       event: ev,
//       translucent: true
//     });
//     await popover.present();
  
//     const { data } = await popover.onDidDismiss();
//     console.log('onDidDismiss resolved with data', data);
//     if(data) {
//       this.enableLocation();
//     }
//   }

}


