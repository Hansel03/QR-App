import { Injectable } from '@angular/core';
import { ScanData } from '../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { MapaPage } from '../mapa/mapa.page';
import {
  Contacts,
  Contact,
  ContactField,
  ContactName,
} from '@ionic-native/contacts/ngx';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private historial: ScanData[];

  constructor(
    private iab: InAppBrowser,
    public modalController: ModalController,
    // tslint:disable-next-line: deprecation
    private contacts: Contacts,
    private platform: Platform,
    private toastController: ToastController
  ) {
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

  async abrirScan(index: number) {
    const scanData = this.historial[index];

    switch (scanData.tipo) {
      case 'http':
        this.iab.create(scanData.info, '_system');
        break;
      case 'mapa':
        const modal = await this.modalController.create({
          component: MapaPage,
          componentProps: {
            coords: scanData.info,
          },
        });
        return await modal.present();

      case 'contacto':
        this.crearContacto(scanData.info);
        break;

      default:
        console.error('Tipo no soportado');

        break;
    }
  }

  private crearContacto(texto: string) {
    const campos: any = this.parse_vcard(texto);

    const nombre = campos.fn;
    const tel = campos.tel[0].value[0];

    if (!this.platform.is('cordova')) {
      console.warn('Estoy en la computadora, no puedo crear contacto');
      return;
    }

    const contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];
    contact.save().then(
      () => this.crearToast('Contacto ' + nombre + ' creado!'),
      (error: any) => this.crearToast('Error: ' + error)
    );
  }

  private async crearToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  private parse_vcard(input: string) {
    const Re1 = /^(version|fn|title|org):(.+)$/i;
    const Re2 = /^([^:;]+);([^:]+):(.+)$/;
    const ReKey = /item\d{1,2}\./;
    const fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      let results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        let meta = {};
        results[2]
          .split(';')
          .map(function (p, i) {
            let match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ['TYPE' + (i === 0 ? '' : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';'),
        });
      }
    });

    return fields;
  }
}
