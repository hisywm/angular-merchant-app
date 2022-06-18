import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMerchantRoutingModule } from './add-merchant-routing.module';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialExampleModule } from 'src/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddMerchantComponent, DialogContentComponent],
  imports: [
    CommonModule,
    AddMerchantRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FlexLayoutModule,
    MaterialExampleModule,
    HttpClientModule,
    MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddMerchantModule {}
