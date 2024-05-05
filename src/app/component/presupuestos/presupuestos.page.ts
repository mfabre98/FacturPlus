import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PresentService } from '../../services/present.service';
import { ServerService } from '../../services/server.service';
import { StorageService } from 'src/app/services/storage.service';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-ngbd-presupuestos',
  standalone: true,
  templateUrl: './presupuestos.page.html',
  styleUrls: ['./presupuestos.page.scss'],
  imports: [
    FormsModule, ReactiveFormsModule , NgIf, NgFor, IonicModule, DecimalPipe
  ]
})
export class NgbdPresupuestosPage implements OnInit {

  user: any;
  userConfig: any;

  isDesktop: boolean;

  lineasPresupuesto: Array<any> = [];
  cliente: string = "";
  showAddBudgetForm: boolean = false;
  modals: any = {
    addBudget: false,
  }
  titleModCre: string = "";

  //MODAL BUDGET
  id: number = 0;
  nombreProducto: string = "";
  cantidad: number = 0;
  boolConIva: boolean = true;
  precioSinIva: number = 0;
  precioConIva: number = 0;

  idLinea: number = 0;
  mostrarTotales: boolean = false;
  precioTotalSinIva: number = 0;
  precioTotalConIva: number = 0;

  mostrarPdfHtml: boolean = false;
  data: string;
  content: string;
  numPresupuesto: number = 0;

  constructor(public present: PresentService, private server: ServerService, private pdfGenerator: PDFGenerator) {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.isDesktop = false;
    } else{
      this.isDesktop = false;
    }
  }
  
  ngOnInit(): void {
    this.getUserConfig();
  }

  async getUserConfig(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.server.findConfigOf(this.user.uid).then((data: any) => {
      if (data){
        let key = Object.keys(data)[0];
        this.userConfig = data[key].empresa;
        this.numPresupuesto = this.userConfig.numPresupuesto ? parseInt(this.userConfig.numPresupuesto) + 1 : 1;
        this.userConfig.numPresupuesto = this.numPresupuesto
      } else {
        this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
      } 
    }).catch(error => {
      this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
    });
  }

  addNewLine(){
    if (this.userConfig && this.userConfig.uId){
      this.modals.addBudget = true;
      this.titleModCre = "Añadir";
    } else {
      this.present.presentToast("Error. No se ha encontrado ninguna configuración guardada.", 5000, 'danger');
    }
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
      this.precioConIva = this.lineasPresupuesto[index].precioConIva;
      this.modals.addBudget = true;
      this.titleModCre = "Editar";      
    } else {
      this.present.presentToast("Error. No se ha encontrado el producto que desea editar.", 5000, 'danger');
      return;
    }
  }

  onAddBudgetSubmit(event: any) {
    if (this.boolConIva){
      let iva = '1.' + this.userConfig.iva
      this.precioSinIva = parseFloat((this.precioConIva / parseFloat(iva)).toFixed(2))
    } else {
      let iva = '0.' + this.userConfig.iva
      let productoIva = parseFloat((this.precioSinIva * parseFloat(iva)).toFixed(2))
      this.precioConIva = parseFloat((parseFloat((this.precioSinIva).toFixed(2)) + productoIva).toFixed(2))
    }
    
    let error = this.validarCampos()
    if (error) {
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
        this.lineasPresupuesto[index].precioConIva = this.precioConIva;
      } else {
        this.present.presentToast("Error. No se ha podido editar la linea.", 5000, 'danger');
        return;
      }
    } else {
      let linea = {
        "id": this.id, 
        "nombreProducto": this.nombreProducto,
        "cantidad": this.cantidad,
        "precioSinIva": this.precioSinIva,
        "precioConIva": this.precioConIva
      }
  
      this.lineasPresupuesto.push(linea);
    }
    
    this.calculateIvaTotal();

    this.id = 0;
    this.nombreProducto = "";
    this.cantidad = 0;
    this.precioSinIva = 0;
    this.precioConIva = 0;
    this.modals.addBudget = false;  
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

  onChangeBoolConIva(event){
    if (event.detail.checked){
      this.boolConIva = true;
    } else {
      this.boolConIva = false;
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

  limpiarLista(){
    this.mostrarTotales = false;
    this.precioTotalSinIva = 0;
    this.precioTotalConIva = 0;
    this.lineasPresupuesto = [];
  }

  generatePdf(){
    let date = new Date()
    let dia = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
    let mes = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)
    this.data = dia + "/" + mes + "/" + date.getFullYear();
    this.mostrarPdfHtml = true;
  }

  async descargarPdf() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'Factura.pdf'
    };
    
    this.pdfGenerator.fromData(this.content, options)
      .then(async (base64) => {
        this.mostrarPdfHtml = false;
        await this.server.saveConfig(this.userConfig, this.user.uid).then(async result => {
          await this.getUserConfig();
        }).catch(e => {
          console.log(e)
        });
      }).catch((error) => {
        if (error == "cordova_not_available") {
          this.present.presentToast("Error generando el PDF, intentas ejecutar una funcionalidad solo soportada en Android.", 5000, 'danger');
        } else {
          this.present.presentToast("Error generando el PDF, por favor contacte a un administrador.", 5000, 'danger');
        }
        console.log('error', error);
        
      });
  }

  cancelarDescargaPdf(){
    this.mostrarPdfHtml = false;
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
    this.precioConIva = 0;
  }

  validarCampos(){
    if (!this.nombreProducto || this.nombreProducto == "") {
      this.present.presentToast("Error. Debe informarse el nombre del producto.", 5000, 'danger');
      return true;
    } else if (isNaN(this.cantidad) || this.cantidad <= 0) {
      this.present.presentToast("Error. Debe informarse la cantidad del producto.", 5000, 'danger');
      return true;
    } else if (!this.boolConIva && (!this.precioSinIva || this.precioSinIva <= 0)) {
      this.present.presentToast("Error. Debe informarse el precio sin IVA del producto.", 5000, 'danger');
      return true;
    } else if (this.boolConIva && (!this.precioSinIva || this.precioSinIva <= 0)) {
      this.present.presentToast("Error. Debe informarse el precio con IVA del producto.", 5000, 'danger');
      return true;
    }
    return false;
  }

}
