import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet';
// import 'leaflet-draw';
// import GeometryUtil from 'leaflet-geometryutil';
// import { GeoJsonObject } from 'geojson';
// import * as turf from '@turf/turf'
// import { Units } from '@turf/turf';
// import { Position } from '@capacitor/geolocation';
import { ScreensizeService } from 'src/app/services/screensize.service';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;


@Component({
  selector: 'app-ngbd-map',
  standalone: true,
  templateUrl: 'map.page.html',
  imports: [
    FormsModule, ReactiveFormsModule , NgFor, IonicModule
  ]
})
export class NgbdMapPage implements OnInit {

  map: L.Map | any;
  tileLayer: any;
  isDesktop: boolean;

  constructor(private toastController: ToastController, private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) window.location.reload();
      this.isDesktop = isDesktop;
    });
  }


  ngOnInit() {
    let Base = this;
    $( document ).ready(function() {
      Base.ionViewDidEnter();

      $( window ).on("resize", function() {
        Base.resizeMapDiv()
      });
    });
  }

  async ionViewDidEnter(){
    await this.resizeMapDiv();
    this.leafletMap();
  }

  leafletMap() {
    if (this.map){
      this.map.remove();
    }
    this.map = L.map('mapId', {keyboard: false, attributionControl: false }).setView([41.579415, 0.826094], 16)
    this.map.ke
    this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxNativeZoom: 19,
        maxZoom: 25,
        minZoom: 5
    }).addTo(this.map).on('click', (e) => {
      this.onMapClick(e);
    });

    // const onExample = this.onExample();
    // new onExample().addTo(this.map);

    L.control.scale().addTo(this.map);

    let text = "Ejemplo de marker con tooltip";

    L.marker([41.5794551273264, 0.8260998071726755]).addTo(this.map)
      .bindPopup(text)
      .openPopup();
  }

  onMapClick(event){

  }



  async getPageWrapperWidthHeight(){
    let width = await $(".page-wrapper").width();
    let height = await $(".page-wrapper").height();
    return {width: width, height: height}
  }

  async resizeMapDiv(){
    if (this.isDesktop){
      let height = await $(window).height();
      $(".container-fluid").css("padding", "0px");
      $(".container-fluid").css("max-width", "100%");
      $(".container-fluid").css("width", "100%");
      let width = await $(".container-fluid").width();
      $("#mapId").width(width);
      let divHeight = height - 65
      $("#mapId").height(divHeight);
      $("#mapId").css("z-index", 1);
    } else {
      let height = await $(".left-sidebar").height();
      $(".page-wrapper").height(height - 1);
      await this.getPageWrapperWidthHeight().then(async pageWrapper => {
        $(".container-fluid").width(pageWrapper.width);
        $(".container-fluid").height(height - 1);
        $("#mapId").width(pageWrapper.width);
        $("#mapId").height(height - 1);
        $("#mapId").css("z-index", 1);
        $(".container-fluid").css("padding", "0px");
      }).catch((err) => {
        this.presentToast("Error resizing map.", "bottom", 5000, 'danger');
      });
    }
    StorageService.saveStorage("reloadPage", true);
  }

  async presentToast(message: string, position: 'top' | 'bottom' | 'middle' = 'bottom', duration=1500, color='success') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: color
    });
    toast.present();
  }

}
