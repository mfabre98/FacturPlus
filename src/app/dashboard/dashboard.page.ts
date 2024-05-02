import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ServerService } from '../services/server.service';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html'
})
export class DashboardPage implements OnInit {

  subtitle: string;
  dataList = [
    {"id": 0, "name": "Opción 0"},
    {"id": 1, "name": "Opción 1"},
    {"id": 2, "name": "Opción 2"},
    {"id": 3, "name": "Opción 3"},
    {"id": 4, "name": "Opción 4"},
    {"id": 5, "name": "Opción 5"},
    {"id": 6, "name": "Opción 6"},
    {"id": 7, "name": "Opción 7"},
    {"id": 8, "name": "Opción 8"},
    {"id": 9, "name": "Opción 9"},
    {"id": 10, "name": "Opción 10"},
    {"id": 11, "name": "Opción 11"},
    {"id": 12, "name": "Opción 12"},
    {"id": 13, "name": "Opción 13"},
    {"id": 14, "name": "Opción 14"},
    {"id": 15, "name": "Opción 15"},
    {"id": 16, "name": "Opción 16"},
    {"id": 17, "name": "Opción 17"},
    {"id": 18, "name": "Opción 18"},
    {"id": 19, "name": "Opción 19"},
    {"id": 20, "name": "Opción 20"},
    {"id": 21, "name": "Opción 21"},
    {"id": 22, "name": "Opción 22"},
    {"id": 23, "name": "Opción 23"},
    {"id": 24, "name": "Opción 24"},
    {"id": 25, "name": "Opción 25"},
  ];
  selectedDataElement;

  num_presupuestos = 0;
  num_facturas = 0;
  existe_configuracion = "No"

  constructor(private server: ServerService) {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.server.findConfigOf(user.uid).then((data: any) => {
      if (data){
        let key = Object.keys(data)[0];
        let userConfig = data[key].empresa;
        this.existe_configuracion = "Si"
        this.num_facturas = userConfig.numFactura ? parseInt(userConfig.numFactura) : 0;
        this.num_presupuestos = userConfig.numPresupuesto ? parseInt(userConfig.numPresupuesto) : 0;
      } else {
        this.existe_configuracion = "No"
        this.num_presupuestos = 0
        this.num_facturas = 0
      } 
    }).catch(error => {
      this.existe_configuracion = "No"
      this.num_presupuestos = 0
      this.num_facturas = 0
    });
  }

  onSelectOptionChange(selectedValues: any){
    if (selectedValues.length){
      this.selectedDataElement = [];
      for (let index = 0; index < selectedValues.length; index++) {
        const element = selectedValues[index];
        this.selectedDataElement.push(this.dataList.find(elem => elem.id == element.id));
      }
    } else {
      this.selectedDataElement = [{"id": -1, "name": ""}];
    }
  }

}
