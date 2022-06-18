import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialExampleModule } from 'src/material.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    NgbModule,
    FlexLayoutModule,
    MaterialExampleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuModule {}
