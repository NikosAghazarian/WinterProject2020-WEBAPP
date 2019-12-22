import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { EditorComponent } from './editor/editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'editor/:type', component: EditorComponent },
  { path: 'viewer/:type', component: ViewerComponent },
  { path: '', redirectTo: '/viewer/1', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
