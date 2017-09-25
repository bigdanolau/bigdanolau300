import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
//Páginas
import { HomePage,TabsPage,BienvenidaPage,PromoPage,ListaPage,FavoritasPage,NosotrosPage,LoginPage,RegistrarPage} from '../pages/pages';

//Plugins
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule  } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
//Providers y Http
import { PromocionesProvider } from '../providers/promociones/promociones';
import { HttpModule } from '@angular/http';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,TabsPage,BienvenidaPage,PromoPage,ListaPage,FavoritasPage,NosotrosPage,LoginPage,RegistrarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Volver',
      tabsPlacement: 'top'
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAVnsIIQ0_5VuuFjNmGaerOr6kyc_yCFXs'
    }),
    AgmSnazzyInfoWindowModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,TabsPage,BienvenidaPage,PromoPage,ListaPage,FavoritasPage,NosotrosPage,LoginPage,RegistrarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Diagnostic,
    StatusBar,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PromocionesProvider,
    UserProvider
  ]
})
export class AppModule {}
