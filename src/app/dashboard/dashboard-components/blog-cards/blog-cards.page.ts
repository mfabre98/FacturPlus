import { Component, OnInit } from '@angular/core';
import {blogcard,blogcards} from './blog-cards-data';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.page.html',
})
export class BlogCardsPage implements OnInit {

  blogcards:blogcard[];

  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    this.blogcards=blogcards;
  }

  ngOnInit() {
  }

}
