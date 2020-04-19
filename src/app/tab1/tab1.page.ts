import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { HistorialService } from '../services/historial.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    private barcodeScanner: BarcodeScanner,
    public toastController: ToastController,
    private platform: Platform,
    private historialService: HistorialService
  ) {}

  public async scan() {
    console.log('Realizando Scan...');

    if (!this.platform.is('cordova')) {
      // prueba con url
      // this.historialService.agregarHistorial('http://google.com');
      // prueba con mapas

      this.historialService.agregarHistorial(
        'geo: 40.725273799136296, -74.18172255000003'
      );
      return;
    }
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode Result', barcodeData.text);
        console.log('Barcode Format', barcodeData.format);
        console.log('Barcode Cancelled', barcodeData.cancelled);

        if (barcodeData.cancelled === false && barcodeData.text) {
          this.historialService.agregarHistorial(barcodeData.text);
        }
      })
      .catch((err) => {
        console.log('Error', err);
        this.presentToast(`Error: ${err}`);
      });
  }

  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
    });
    toast.present();
  }
}
