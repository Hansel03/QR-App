import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @Input() coords: string;
  latitude: number;
  longitude: number;
  zoom: number;
  coordsArray: any[] = [];
  constructor(public modalController: ModalController) {
    this.zoom = 18;
  }

  ngOnInit() {
    this.coordsArray = this.coords.split(',');
    this.latitude = +this.coordsArray[0].replace('geo: ', '');
    this.longitude = +this.coordsArray[1].replace(' ', '');
  }

  public close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
