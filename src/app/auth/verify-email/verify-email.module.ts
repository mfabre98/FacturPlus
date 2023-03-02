import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';

import { VerifyEmailPage } from './verify-email.page';
import { ExploreContainerComponentModule } from "../../explore-container/explore-container.module";

@NgModule({
    declarations: [VerifyEmailPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerifyEmailPageRoutingModule,
        ExploreContainerComponentModule
    ]
})
export class VerifyEmailPageModule {}
