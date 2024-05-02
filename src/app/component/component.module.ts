import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicPage } from './pagination/pagination.page';
import { NgbdAlertBasicPage } from './alert/alert.page';
import { NgbdDropdownBasicPage } from './dropdown-collapse/dropdown-collapse.page';
import { NgbdnavBasicPage } from './nav/nav.page';
import { NgbdButtonsPage } from './buttons/buttons.page';
import { NgbdMapPage } from './map/map.page';
import { CardsPage } from './card/card.page';
import { TablePage } from "./table/table.page";
import { NgbdConfigurationPage } from './configuration/configuration.page';
import { NgbdFacturasPage } from './facturas/facturas.page';
import { NgbdPresupuestosPage } from './presupuestos/presupuestos.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgbModule,
    NgbdpaginationBasicPage,
    NgbdAlertBasicPage,
    NgbdDropdownBasicPage,
    NgbdnavBasicPage,
    NgbdButtonsPage,
    NgbdMapPage,
    NgbdConfigurationPage,
    NgbdFacturasPage,
    NgbdPresupuestosPage,
    CardsPage,
    TablePage
  ],
})
export class ComponentsModule { }
