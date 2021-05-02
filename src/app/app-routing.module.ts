import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreasureMainComponent } from './components/treasure-main/treasure-main.component'
import { TreasureContentComponent } from './components/treasure-content/treasure-content.component'
import { TreasureLoginSignupComponent } from './components/treasure-login-signup/treasure-login-signup.component'

import { AuthenGuard } from './shared/common/_helper/authen.guard'

const routes: Routes = [
  {
    path:'treasure',
    component: TreasureMainComponent,
    children:[
      {
        path:'note',
        component:TreasureContentComponent,
        canActivate: [AuthenGuard]
      },
      // {
      //   path: 'food',
      //   component:FoodComponent
      // },
      // {
      //   path: 'menu',
      //   component: MenuComponent
      // }
    ]
  },
  { 
    path: 'login', 
    component: TreasureLoginSignupComponent, 
    pathMatch: 'full' 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
