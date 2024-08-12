import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private path = 'Productos/';

  center: google.maps.LatLngLiteral = { lat: 31.591833, lng: -106.402583 };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral = this.center;
  markers: google.maps.Marker[] = [];


  constructor(public menucontroler: MenuController,
    public firestoreService: FirestoreService) {

    this.loadProductos();
  }

  ngOnInit() { }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  loadProductos() {
    this.firestoreService.getCollection(this.path).subscribe(res => {
      console.log(res);
    });
  }

}
