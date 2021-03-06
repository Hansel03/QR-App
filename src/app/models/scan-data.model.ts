export class ScanData {
  info: string;
  tipo: string;

  constructor(tipoArchivo: string) {
    this.tipo = 'No definido';
    this.info = tipoArchivo;

    if (tipoArchivo.startsWith('http')) {
      this.tipo = 'http';
    } else if (tipoArchivo.startsWith('geo')) {
      this.tipo = 'mapa';
    } else if (tipoArchivo.startsWith('BEGIN:VCARD')) {
      this.tipo = 'contacto';
    }
  }
}
