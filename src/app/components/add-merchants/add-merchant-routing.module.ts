import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';

const routes: Routes = [
  {
    path: '',
    component: AddMerchantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMerchantRoutingModule {}
