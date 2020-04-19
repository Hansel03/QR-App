import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  constructor(private mapsAPILoader: MapsAPILoader) {
    this.latitude = 10.871708082082758;
    this.longitude = -74.77905641457221;
    this.zoom = 18;
  }

  ngOnInit() {}
}
