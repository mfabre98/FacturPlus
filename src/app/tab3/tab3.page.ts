import { Component, OnInit } from '@angular/core';
import { PresentService } from '../services/present.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  nombreEmpresa: string = "";
  direccionEmpresa: string = "";
  cpEmpresa: string = "";
  poblacionEmpresa: string = "";
  provinciaEmpresa: string = "";
  paisEmpresa: string = "";
  nifEmpresa: string = "";
  iva: number = 0;
  numFactura: number = 0;
  user: any;

  constructor(public present: PresentService, private server: ServerService) {}
  
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
        this.cpEmpresa = config[key].empresa.cpEmpresa;
        this.poblacionEmpresa = config[key].empresa.poblacionEmpresa;
        this.provinciaEmpresa = config[key].empresa.provinciaEmpresa;
        this.paisEmpresa = config[key].empresa.paisEmpresa;
        this.nifEmpresa = config[key].empresa.nifEmpresa;
        this.iva = config[key].empresa.iva;
        this.numFactura = config[key].empresa.numFactura;
      } else {
        this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
      }      
    })
    .catch(e => {
      this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
    });
  }

  onConfigEmpresaSubmit(event: any) {
    this.nombreEmpresa = event.target[0].value;
    this.direccionEmpresa = event.target[2].value;
    this.cpEmpresa = event.target[4].value;
    this.poblacionEmpresa = event.target[6].value;
    this.provinciaEmpresa = event.target[8].value;
    this.paisEmpresa = event.target[10].value;
    this.nifEmpresa = event.target[12].value;
    this.iva = parseFloat(event.target[14].value);
    if (this.nombreEmpresa == "" || this.direccionEmpresa == "" || this.cpEmpresa == "" 
        || this.poblacionEmpresa == "" || this.provinciaEmpresa == "" || this.paisEmpresa == "" 
        || this.nifEmpresa == "" || isNaN(this.iva)) {
      this.present.presentToast("Error. Falta un campo para informar.", 5000, 'danger');
      return;
    }
    let config = {
      "uId": this.user.uid,
      "nombreEmpresa": this.nombreEmpresa,
      "direccionEmpresa": this.direccionEmpresa,
      "cpEmpresa": this.cpEmpresa,
      "poblacionEmpresa": this.poblacionEmpresa,
      "provinciaEmpresa": this.provinciaEmpresa,
      "paisEmpresa": this.paisEmpresa,
      "nifEmpresa": this.nifEmpresa,
      "iva": this.iva,
      "numFactura": this.numFactura
    }
    if (this.user && this.user.uid){
      this.server.saveConfig(config, this.user.uid)
    } else {
      this.present.presentToast("Error. No se ha podido guardar la configuración.", 5000, 'danger');
    }    
  }

}
