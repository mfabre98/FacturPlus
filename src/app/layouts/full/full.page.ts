import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { IonicModule } from '@ionic/angular';
import { HeaderPage } from "src/app/shared/header/header.page";
import { SidebarPage } from "src/app/shared/sidebar/sidebar.page";
import { FooterPage } from "src/app/shared/footer/footer.page";
import { ScreensizeService } from 'src/app/services/screensize.service';
declare var $:any;

@Component({
    selector: "app-full-layout",
    standalone: true,
    templateUrl: "./full.page.html",
    styleUrls: ["./full.page.scss"],
    imports: [IonicModule, RouterModule, SidebarPage, HeaderPage, CommonModule, NgbCollapseModule, FooterPage]
})
export class FullPage implements OnInit {

  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";
  isDesktop: boolean;

  constructor(public router: Router, private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) window.location.reload();
      this.isDesktop = isDesktop;
    });
  }

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === "/") {
      this.router.navigate(["/dashboard"]);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();

    $( document ).ready(function() {
      let width = $('.left-sidebar').width();
      $('.sidebar-nav').css("height", '100%');
      $('.sidebar-nav').css("background-color", '#FFFFFF');
      $('.sidebar-nav').css("width", width+'px');
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }
}
