import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';

import { VerifyEmailPage } from './verify-email.page';

@NgModule({
    declarations: [VerifyEmailPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerifyEmailPageRoutingModule
    ]
})
export class VerifyEmailPageModule {}
