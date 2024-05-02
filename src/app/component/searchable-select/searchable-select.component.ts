import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent, AnimationController } from '@ionic/angular';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, InfiniteScrollModule],
  selector: 'custom-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnChanges {
  @Input() data = [];
  @Input() multiple = false;
  @Input() itemTextField = "name";
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter()

  isOpen = false;
  selected = [];
  filtered = [];
  itemsList = [];

  filterText = ""

  isLoading=false;
  currentPage=1;
  itemsPerPage=20;

  toggleLoading = ()=>this.isLoading=!this.isLoading;

  // it will be called when this component gets initialized.
  loadData = ()=>{
    this.toggleLoading();
    this.getItems(this.currentPage,this.itemsPerPage).subscribe({
      next:response=>this.itemsList = response,
      error:err=>console.log(err),
      complete:()=>this.toggleLoading()
    })
  }

  // this method will be called on scrolling the page
  appendData= ()=>{
    this.toggleLoading();
    this.getItems(this.currentPage,this.itemsPerPage).subscribe({
      next:response=>this.itemsList = [...this.itemsList,...response],
      error:err=>console.log(err),
      complete:()=>this.toggleLoading()
    })
  }

  onScroll= ()=>{
    this.currentPage++;
    this.appendData();
  }

  constructor(private animationCtrl: AnimationController) {
    if (!this.multiple) {
      let dt = this.data.filter(item => item.selected);
      for (let index = 0; index < dt.length; index++) {
        const element = dt[index];
        element.selected = false;
      }
      this.selected = [];
    }
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.multiple) {
      let dt = this.data.filter(item => item.selected);
      for (let index = 0; index < dt.length; index++) {
        const element = dt[index];
        element.selected = false;
      }
      this.selected = [];
    }

    this.filtered = this.data;
  }

  open(){
    this.isOpen=true;
    this.loadData();
  }

  cancel(){
    this.currentPage = 1;
    this.filterText = "";
    this.filtered = this.data.filter(item => item[this.itemTextField].toLowerCase().indexOf("") >= 0);
    this.isOpen=false;
  }

  select(){
    this.selected = this.data.filter(item => item.selected);
    this.currentPage = 1;
    this.isOpen=false;
    this.filtered = this.data;
    this.selectedChanged.emit(this.selected);
  }

  itemSelected(){
    if (!this.multiple){
      if (this.selected.length){
        this.selected[0].selected = false;
      }
      this.selected = this.data.filter(item => item.selected);
      this.currentPage = 1;
      this.isOpen = false;
      this.selectedChanged.emit(this.selected);
      //this.data.map( item => (item.selected = false))
    }
  }

  getItems(page=1,itemsPerPage=10):Observable<string[]>{
    const startIndex=(page-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage;
    const items=[];
    for(let i=startIndex;i<endIndex;i++){
     if(i<this.filtered.length){
       items.push(this.filtered[i]);
     }
    }
    return of(items).pipe(delay(500));
   }

  filter(event: SearchbarCustomEvent){
    const filter = event.detail.value.toLowerCase();
    this.filterText = filter
    this.filtered = this.data.filter(item => item[this.itemTextField].toLowerCase().indexOf(filter) >= 0);
    this.currentPage = 1;
    this.loadData();
  }
}
