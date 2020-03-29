import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailViewComponent } from './detail-view/detail-view.component';


const routes: Routes = [
  { path: 'viewer/:type', component: ViewerComponent },
  { path: 'detail/:type', component: DetailViewComponent },
  { path: '', redirectTo: '/viewer/1', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
