import { Component } from '@angular/core';
import { HistorialService } from '../services/historial.service';
import { ScanData } from '../models/scan-data.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public historial: ScanData[] = [];
  constructor(private historialService: HistorialService) {
    this.historial = this.historialService.cargarHistorial();
  }

  public abrirScan(index: number) {
    this.historialService.abrirScan(index);
  }
}
