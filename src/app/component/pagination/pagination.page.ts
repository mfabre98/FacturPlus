import { Component, OnInit } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';

const FILTER_PAG_REGEX = /[^0-9]/g;
declare var $:any;

@Component({
  selector: 'app-ngbd-pagination',
  standalone: true,
  imports: [NgbPaginationModule, NgIf],
  templateUrl: './pagination.page.html',
})
export class NgbdpaginationBasicPage implements OnInit {
  page = 4;
  page2 = 4;
  currentPage = 3;
  page3 = 4;

  //   disabled
  page4 = 3;
  isDisabled = true;

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }

  ngOnInit() {
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  //   custom links
  page5 = 4;

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectPage(page: string) {
    this.page5 = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}
