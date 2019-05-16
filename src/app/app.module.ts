import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CO2SignalService } from './CO2Signal.service';
import { audiCO2SignalService } from './audiCO2SignalService';
import { bmwCO2SignalService } from './bmwCO2SignalService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CO2SignalService,
    audiCO2SignalService,
    bmwCO2SignalService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
