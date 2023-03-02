import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ExploreContainerComponentModule } from "../../explore-container/explore-container.module";

@NgModule({
    declarations: [RegisterPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegisterPageRoutingModule,
        ExploreContainerComponentModule
    ]
})
export class RegisterPageModule {}
