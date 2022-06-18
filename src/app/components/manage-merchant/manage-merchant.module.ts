import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMerchantRoutingModule } from './manage-merchant-routing.module';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { DialogPopupComponent } from './dialog-popup/dialog-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialExampleModule } from 'src/material.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ManageMerchantComponent, DialogPopupComponent],
  imports: [
    CommonModule,
    ManageMerchantRoutingModule,
    NgbModule,
    FlexLayoutModule,
    MaterialExampleModule,
    MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageMerchantModule {}
