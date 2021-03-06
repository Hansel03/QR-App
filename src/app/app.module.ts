import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaPage } from '../app/mapa/mapa.page';
import { MapaPageModule } from '../app/mapa/mapa.module';

// plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
  Contacts,
  Contact,
  ContactField,
  ContactName,
} from '@ionic-native/contacts/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [MapaPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MapaPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    // tslint:disable-next-line: deprecation
    Contacts,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
