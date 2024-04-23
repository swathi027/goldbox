import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AppLivepricesComponent } from './app-liveprices/app-liveprices.component';
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'liverates',component:AppLivepricesComponent},
      {
        path: 'signin',
        loadChildren: () =>
          import('./signin/signin.module').then((m) => m.SigninModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
