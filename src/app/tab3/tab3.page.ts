import { Component, OnInit } from '@angular/core';
import { PresentService } from '../services/present.service';

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
  IVA: number = 0;

  constructor(public present: PresentService) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onConfigEmpresaSubmit(event: any) {
    debugger;
    this.nombreEmpresa = event.target[0].value;
    this.direccionEmpresa = event.target[2].value;
    this.cpEmpresa = event.target[4].value;
    this.poblacionEmpresa = event.target[6].value;
    this.provinciaEmpresa = event.target[8].value;
    this.paisEmpresa = event.target[10].value;
    this.nifEmpresa = event.target[12].value;
    this.IVA = parseFloat(event.target[14].value);
    if (this.nombreEmpresa == "" || this.direccionEmpresa == "" || this.cpEmpresa == "" 
        || this.poblacionEmpresa == "" || this.provinciaEmpresa == "" || this.paisEmpresa == "" 
        || this.nifEmpresa == "" || isNaN(this.IVA)) {
      this.present.presentToast("Error. Falta un campo para informar.", 5000, 'danger');
      return;
    }
    
  }

}
