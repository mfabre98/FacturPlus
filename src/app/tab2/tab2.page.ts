import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  lineasPresupuesto: Array<any> = []

  constructor() {}
  
  ngOnInit(): void {
    
  }

  addNewLine(){

  }

  editLine(id){

  }

  removeLine(id){

  }

  generatePdf(){
    
  }

}
