import { LoginComponent } from './layout/pages/login/login.component';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptors/header/header.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { errorInterceptor } from './shared/interceptors/errors/error.interceptor';
import { loadingInterceptor } from './shared/interceptors/loading/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([headerInterceptor,errorInterceptor,loadingInterceptor])),provideAnimations(),provideToastr(),provideRouter(routes, withViewTransitions()), provideClientHydration(), importProvidersFrom(HttpClientModule , RouterModule ,BrowserAnimationsModule, NgxSpinnerModule ,
    TranslateModule.forRoot({
      loader :{
        provide : TranslateLoader,
        useFactory : HttpLoaderFactory,
        deps :[HttpClient]
      }
    })
  )]
};
