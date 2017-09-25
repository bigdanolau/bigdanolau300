import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage,TabsPage,BienvenidaPage,LoginPage } from '../pages/pages';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(private statusBar: StatusBar,platform: Platform, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      // var bannerConfig: AdMobFreeBannerConfig;
      // if (platform.is('ios')) {
      //       bannerConfig= {
      //         id: 'ca-app-pub-8710968443490652/8416224188',
      //         isTesting: false,
      //         autoShow: true
      //       }
      //     } else if (platform.is('android')) {
      //       bannerConfig= {
      //         id: 'ca-app-pub-8710968443490652/1929872739',
      //         bannerAtTop: false,
      //         isTesting: true,
      //         autoShow: true
      //       }
      //     }
      //     this.admobFree.banner.config(bannerConfig);
      //
      //     this.admobFree.banner.prepare()
      //     .then(() => {
      //       // banner Ad is ready
      //       // if we set autoShow to false, then we will need to call the show method here
      //     })
      //     .catch(e => console.log(e));
      //         // Okay, so the platform is ready and our plugins are available.
      //         // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // let status bar overlay webview
//this.statusBar.overlaysWebView(true);

// set status bar to white
this.statusBar.backgroundColorByHexString('#3d107b');
    });
  }
}
