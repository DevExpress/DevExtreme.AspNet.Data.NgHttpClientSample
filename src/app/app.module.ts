import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import devextremeAjax from 'devextreme/core/utils/ajax';
import { sendRequestFactory } from '../ng-http-client-helper';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(httpClient: HttpClient) {
    devextremeAjax.inject({ sendRequest: sendRequestFactory(httpClient) });
  }

}
