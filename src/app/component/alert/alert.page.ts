import { Input, Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { AlertController, IonModal, Platform, IonAccordionGroup, PopoverController } from '@ionic/angular';
//import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;


@Component({
  selector: 'app-ngbd-alert',
  standalone: true,
  imports: [NgbAlertModule, NgFor, NgIf],
  templateUrl: 'alert.page.html',
  styles: [
    `
      .alert-custom {
        color: #cc4dd5;
        background-color: #f0c4f3;
        border-color: #f0c4f3;
      }
    `,
  ],
})
export class NgbdAlertBasicPage implements OnInit {
  // this is for the Closeable Alert
  @Input() public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;
  constructor(private toastController: ToastController) {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    this.alerts.push(
      {
        id: 1,
        type: 'primary',
        message: 'This is a primary alert',
      },
      {
        id: 2,
        type: 'info',
        message: 'This is an info alert',
      },
      {
        id: 3,
        type: 'success',
        message: 'This is an success alert',
      },
      {
        id: 4,
        type: 'warning',
        message: 'This is a warning alert',
      },
      {
        id: 5,
        type: 'danger',
        message: 'This is a danger alert',
      },
      {
        id: 6,
        type: 'secondary',
        message: 'This is an secondary alert',
      }
    );
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
  }

  alertSuccess(){
    this.presentToast("Ejemplo de alert success en la parte inferior.", "bottom", 3000);
  }

  alertPrimary(){
    this.presentToast("Ejemplo de alert primary en la parte central.", "middle", 3000, 'primary');
  }

  alertWarning(){
    this.presentToast("Ejemplo de alert warning en la parte superior.", "top", 3000, 'warning');
  }

  alertDanger(){
    this.presentToastClose("Ejemplo de alert danger en la parte superior y solo se cierra con el click en el botón 'Cerrar'.", "top", 'danger');
  }

  async presentToast(message: string, position: 'top' | 'bottom' | 'middle' = 'bottom', duration=1500, color='success') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: color
    });
    toast.present();
  }

  async presentToastClose(message: string, position: 'top' | 'bottom' | 'middle' = 'bottom', color = 'success') {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      color: color,
      buttons: [
         {
          side: 'end',
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    await toast.present();
  }


}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
