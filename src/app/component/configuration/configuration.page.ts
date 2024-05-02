import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PresentService } from '../../services/present.service';
import { ServerService } from '../../services/server.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ngbd-configuration',
  standalone: true,
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
  imports: [
    FormsModule, ReactiveFormsModule , NgIf, NgFor, IonicModule
  ]
})
export class NgbdConfigurationPage implements OnInit {

  nombreEmpresa: string = "";
  direccionEmpresa: string = "";
  emailEmpresa: string = "";
  telefonoEmpresa: string = "";
  cpEmpresa: number = 0;
  poblacionEmpresa: string = "";
  provinciaEmpresa: string = "";
  paisEmpresa: string = "";
  cifEmpresa: string = "";
  iva: number = 0;
  numFactura: number = 0;
  numPresupuesto: number = 0;
  user: any;

  constructor(public present: PresentService, private server: ServerService) {    
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }
  
  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('user'));

    if (user && user != "null"){
      this.user = user;
    }
    this.server.findConfigOf(user.uid).then(config => {
      if (config){
        let key = Object.keys(config)[0];
        this.nombreEmpresa = config[key].empresa.nombreEmpresa;
        this.direccionEmpresa = config[key].empresa.direccionEmpresa;
        this.emailEmpresa = config[key].empresa.emailEmpresa;
        this.telefonoEmpresa = config[key].empresa.telefonoEmpresa;
        this.cpEmpresa = config[key].empresa.cpEmpresa;
        this.poblacionEmpresa = config[key].empresa.poblacionEmpresa;
        this.provinciaEmpresa = config[key].empresa.provinciaEmpresa;
        this.paisEmpresa = config[key].empresa.paisEmpresa;
        this.cifEmpresa = config[key].empresa.cifEmpresa;
        this.iva = config[key].empresa.iva;
        this.numFactura = config[key].empresa.numFactura;
        this.numPresupuesto = config[key].empresa.numPresupuesto;
      } else {
        this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
      }      
    })
    .catch(e => {
      this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
    });
  }

  onConfigEmpresaSubmit(event: any) {
    let error = this.validarCampos();
    if (error){
      return
    }
    let config = {
      "uId": this.user.uid,
      "nombreEmpresa": this.nombreEmpresa,
      "direccionEmpresa": this.direccionEmpresa,
      "emailEmpresa": this.emailEmpresa,
      "telefonoEmpresa": this.telefonoEmpresa,
      "cpEmpresa": this.cpEmpresa,
      "poblacionEmpresa": this.poblacionEmpresa,
      "provinciaEmpresa": this.provinciaEmpresa,
      "paisEmpresa": this.paisEmpresa,
      "cifEmpresa": this.cifEmpresa,
      "iva": this.iva,
      "numFactura": this.numFactura,
      "numPresupuesto": this.numPresupuesto,
    }
    
    if (this.user && this.user.uid){
      this.server.saveConfig(config, this.user.uid).then(result => {
        this.present.presentToast("Datos guardados correctamente.");
      })
      .catch(e => {
        this.present.presentToast("Error. No se ha podido guardar la configuración.", 5000, 'danger');
      });
    } else {
      this.present.presentToast("Error. No se ha podido guardar la configuración.", 5000, 'danger');
    }    
  }

  validarCampos(){
    if (!this.nombreEmpresa || this.nombreEmpresa == "") {
      this.present.presentToast("Error. Debe informarse el nombre de la empresa.", 5000, 'danger');
      return true;
    } else if (!this.direccionEmpresa || this.direccionEmpresa == "") {
      this.present.presentToast("Error. Debe informarse la dirección de la empresa.", 5000, 'danger');
      return true;
    } else if (!this.emailEmpresa || this.emailEmpresa == "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailEmpresa)) {
      this.present.presentToast("Error. Debe informarse el correo electronico de la empresa.", 5000, 'danger');
      return true;
    } else if (!this.telefonoEmpresa || this.telefonoEmpresa == "" || !/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3})$/.test(this.telefonoEmpresa)) {
      this.present.presentToast("Error. Debe informarse el telefono de la empresa.", 5000, 'danger');
      return true;
    } else if (isNaN(this.cpEmpresa) || this.cpEmpresa <= 0) {
      this.present.presentToast("Error. Debe informarse el codigo postal de la empresa.", 5000, 'danger');
      return true;
    } else if (!this.poblacionEmpresa || this.poblacionEmpresa == "") {
      this.present.presentToast("Error. Debe informarse la población de la empresa.", 5000, 'danger');
      return true;
    } else if (!this.provinciaEmpresa || this.provinciaEmpresa == "") {
      this.present.presentToast("Error. Debe informarse la provincia de la empresa.", 5000, 'danger');
      return true;
    } else if (!this.paisEmpresa || this.paisEmpresa == "") {
      this.present.presentToast("Error. Debe informarse el país de la empresa.", 5000, 'danger');
      return true;
    } else if (!this.cifEmpresa || this.cifEmpresa == "") {
      this.present.presentToast("Error. Debe informarse el CIF de la empresa.", 5000, 'danger');
      return true;
    } else if (isNaN(this.iva) && this.iva <= 0) {
      this.present.presentToast("Error. Debe informarse el IVA de la empresa.", 5000, 'danger');
      return true;
    }
    return false;
  }

}
