export class ScanData {
  info: string;
  tipo: string;

  constructor(tipoArchivo: string) {
    this.tipo = 'No definido';
    this.info = tipoArchivo;

    if (tipoArchivo.startsWith('http')) {
      this.tipo = 'http';
    }
  }
}
