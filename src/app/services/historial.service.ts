import { Injectable } from '@angular/core';
import { ScanData } from '../models/scan-data.model';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private historial: ScanData[];

  constructor() {
    this.historial = [];
  }

  agregarHistorial(texto: string) {
    const data = new ScanData(texto);
    this.historial.unshift(data);
    console.log(this.historial);
  }

  cargarHistorial() {
    return this.historial;
  }
}
