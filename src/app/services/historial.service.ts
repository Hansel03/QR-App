import { Injectable } from '@angular/core';
import { ScanData } from '../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private historial: ScanData[];

  constructor(private iab: InAppBrowser) {
    this.historial = [];
  }

  agregarHistorial(texto: string) {
    const data = new ScanData(texto);
    this.historial.unshift(data);
    console.log(this.historial);
    this.abrirScan(0);
  }

  cargarHistorial() {
    return this.historial;
  }

  abrirScan(index: number) {
    const scanData = this.historial[index];

    switch (scanData.tipo) {
      case 'http':
        this.iab.create(scanData.info, '_system');
        break;

      default:
        console.error('Tipo no soportado');

        break;
    }
  }
}
