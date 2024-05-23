import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChefComponent } from './components/chef/chef.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: '', component: HomeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'chef', component: ChefComponent },
  { path: 'add-menu', component: AddMenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
