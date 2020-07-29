import { Component, OnInit, ViewChild } from '@angular/core';
import { registerElement } from '@nativescript/angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';


// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
  selector: 'ns-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude = 32.109333;
  longitude = 34.855499;
  zoom = 8;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;

  lastCamera: String;

  constructor() { }

  ngOnInit(): void {
  }

  //Map events
  onMapReady(event) {
    console.log('Map Ready');

    this.mapView = event.object;
    this.mapView.zoom = 15
    console.log("Setting a marker...");

    var marker = new Marker();
    marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
    marker.title = "Tel-Aviv";
    marker.snippet = "Israel";
    marker.userData = { index: 1 };
  
    this.mapView.addMarker(marker);
  }

  onCoordinateTapped(args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
  }

  onMarkerEvent(args) {
    console.log("Marker Event: '" + args.eventName
      + "' triggered on: " + args.marker.title
      + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
  }

  onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
    this.lastCamera = JSON.stringify(args.camera);
  }

  onCameraMove(args) {
    console.log("Camera moving: " + JSON.stringify(args.camera));
  }
}
