import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'manage-merchant',
    loadChildren: () =>
      import('../manage-merchant/manage-merchant.module').then(
        (m) => m.ManageMerchantModule
      ),
  },
  {
    path: 'add-merchant',
    loadChildren: () =>
      import('../add-merchants/add-merchant.module').then(
        (m) => m.AddMerchantModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
