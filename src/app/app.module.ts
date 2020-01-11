import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    PageNotFoundComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
