import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NewvariablesComponent } from './newvariables/newvariables.component';
import { MypageComponent } from './mypage/mypage.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupHeroComponent } from './group-hero/group-hero.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'groups', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'newvariable', component: NewvariablesComponent },
  { path: 'mypage', component: MypageComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group-of-hero', component: GroupHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
