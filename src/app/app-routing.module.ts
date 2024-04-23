import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/core.index';
import { TransactionsComponent } from './core-component/transactions/transactions.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: '',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./core-component/core-component.module').then(
        (m) => m.CoreComponentModule
      ),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'errorpages',
    loadChildren: () =>
      import('./core-component/errorpages/errorpages.module').then((m) => m.ErrorpagesModule),
  },
  {
    path: '**',
    redirectTo: 'errorpages/error404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
