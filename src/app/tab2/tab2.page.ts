import { Component, OnInit } from '@angular/core';
import { PresentService } from '../services/present.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  user: any;
  userConfig: any;

  lineasPresupuesto: Array<any> = []
  showAddBudgetForm: boolean = false;
  modals: any = {
    addBudget: false,
  }
  titleModCre: string = "";

  //MODAL BUDGET
  id: number = 0;
  nombreProducto: string = "";
  cantidad: number = 0;
  precioSinIva: number = 0;

  idLinea: number = 0;
  mostrarTotales: boolean = false;
  precioTotalSinIva: number = 0;
  precioTotalConIva: number = 0;

  constructor(public present: PresentService, private server: ServerService) {}
  
  async ngOnInit(): Promise<void> {
    this.user = JSON.parse(localStorage.getItem('user'));
    let config = await this.server.findConfigOf(this.user.uid);
    if (config){
      let key = Object.keys(config)[0];
      this.userConfig = config[key].empresa;
    } else {
      this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
    } 
  }

  addNewLine(){
    this.modals.addBudget = true;
    this.titleModCre = "Añadir";
  }

  getNextLineId(){
    this.idLinea = this.idLinea + 1;
    return this.idLinea
  }

  editLine(id){
    let index = this.lineasPresupuesto.findIndex(elem => elem.id == id);
    if (index >= 0){
      this.id = this.lineasPresupuesto[index].id;
      this.nombreProducto = this.lineasPresupuesto[index].nombreProducto;
      this.cantidad = this.lineasPresupuesto[index].cantidad;
      this.precioSinIva = this.lineasPresupuesto[index].precioSinIva;
      this.modals.addBudget = true;
      this.titleModCre = "Editar";      
    } else {
      this.present.presentToast("Error. No se ha encontrado el producto que desea editar.", 5000, 'danger');
      return;
    }
  }

  onAddBudgetSubmit(event: any) {
    this.nombreProducto = event.target[0].value;
    this.cantidad = parseFloat(event.target[2].value);
    this.precioSinIva = parseFloat(event.target[4].value);
    if (this.nombreProducto == "" || (isNaN(this.cantidad) || this.cantidad < 1) || (isNaN(this.precioSinIva) || this.precioSinIva < 1)) {
      this.present.presentToast("Error. Falta uno o varios campos para informar.", 5000, 'danger');
      return;
    }
    
    let esEditar = false;
    if (this.id == 0){
      this.id = this.getNextLineId();
    } else {
      esEditar = true;
    }

    if (esEditar){
      let index = this.lineasPresupuesto.findIndex(elem => elem.id == this.id);
      if (index >= 0){
        this.lineasPresupuesto[index].nombreProducto = this.nombreProducto;
        this.lineasPresupuesto[index].cantidad = this.cantidad;
        this.lineasPresupuesto[index].precioSinIva = this.precioSinIva;
      } else {
        this.present.presentToast("Error. No se ha podido editar la linea.", 5000, 'danger');
        return;
      }
    } else {
      let linea = {
        "id": this.id, 
        "nombreProducto": this.nombreProducto,
        "cantidad": this.cantidad,
        "precioSinIva": this.precioSinIva
      }
  
      this.lineasPresupuesto.push(linea);
    }
    
    this.calculateIvaTotal();

    this.id = 0;
    this.nombreProducto = "";
    this.cantidad = 0;
    this.precioSinIva = 0;
    this.modals.addBudget = false;
    //TODO: ABRIR PANTALLA DONDE MOSTRAR EL PREVIEW DEL PDF Y BOTON DE GENERAR
    // if (this.user && this.user.uid){
    //   let ok = await this.server.saveConfig(config, this.user.uid);
    //   this.nombreProducto = "";
    //   this.cantidad = 0;
    //   this.cantidad = 0;
    //   this.modals.addBudget = false;
    // } else {
    //   this.present.presentToast("Error. No se ha podido guardar la configuración.", 5000, 'danger');
    // }    
  }

  removeLine(id){
    let index = this.lineasPresupuesto.findIndex(elem => elem.id == id);
    if (index >= 0){
      this.lineasPresupuesto.splice(index, 1);
      this.calculateIvaTotal();
    } else {
      this.present.presentToast("Error. No se ha podido eliminar la linea.", 5000, 'danger');
      return;
    }
  }

  calculateIvaTotal(){
    this.precioTotalSinIva = 0;
    this.precioTotalConIva = 0;
    this.mostrarTotales = false;
    if (this.lineasPresupuesto.length > 0) {
      for (let index = 0; index < this.lineasPresupuesto.length; index++) {
        const linea = this.lineasPresupuesto[index];
        this.precioTotalSinIva = this.precioTotalSinIva + (linea.precioSinIva * linea.cantidad);
        let iva = '1.' + this.userConfig.iva
        this.precioTotalConIva = this.precioTotalSinIva * parseFloat(iva);
      }
      this.mostrarTotales = true;
    }    
  }

  generatePdf(){
    
  }

  onWillDismiss(event: any) {
    const modal_name = event.target.id.replace("modal_", "");
    this.modals[modal_name] = false;
  }

  cancel() {
    // this.modal.dismiss(null, 'cancel');
    this.modals.addBudget = false;    
    this.id = 0;
    this.nombreProducto = "";
    this.cantidad = 0;
    this.precioSinIva = 0;
  }

}
