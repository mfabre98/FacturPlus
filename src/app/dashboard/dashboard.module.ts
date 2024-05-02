import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { NgApexchartsModule } from "ng-apexcharts";

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SalesRatioPage } from "./dashboard-components/sales-ratio/sales-ratio.page";
import { FeedsPage } from "./dashboard-components/feeds/feeds.page";
import { TopSellingsPage } from "./dashboard-components/top-sellings/top-sellings.page";
import { TopCardsPage } from "./dashboard-components/top-cards/top-cards.page";
import { SearchableSelectComponent } from "../component/searchable-select/searchable-select.component";
import { BlogCardsPage } from "./dashboard-components/blog-cards/blog-cards.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgApexchartsModule,
    SearchableSelectComponent
  ],
  declarations: [
    DashboardPage,
    SalesRatioPage,
    FeedsPage,
    TopSellingsPage,
    TopCardsPage,
    BlogCardsPage,
  ]
})
export class DashboardPageModule {}
