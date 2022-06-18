import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';

const routes: Routes = [
  {
    path: '',
    component: ManageMerchantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMerchantRoutingModule {}
