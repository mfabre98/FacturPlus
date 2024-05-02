import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/shared/sidebar/menu-items';
import { RouteInfo } from "src/app/shared/sidebar/sidebar.metadata";
import { ScreensizeService } from 'src/app/services/screensize.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports:[IonicModule, NgbDropdownModule, CommonModule, RouterModule],
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  public sidebarnavItems:RouteInfo[]=[];
  isDesktop: boolean;

  constructor(private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) window.location.reload();
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }

}
