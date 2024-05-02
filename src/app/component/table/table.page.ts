import { Component, OnInit } from '@angular/core';
import { Product, TopSelling, TableRows, Employee } from './table-data';
import { NgFor } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor],
  templateUrl: 'table.page.html'
})
export class TablePage implements OnInit {
  topSelling: Product[];

  trow: TableRows[];

  constructor() {

    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }

    this.topSelling = TopSelling;

    this.trow = Employee;
  }

  ngOnInit() {
  }

}
