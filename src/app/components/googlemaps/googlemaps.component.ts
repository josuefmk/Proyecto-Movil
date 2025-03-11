import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  constructor(private fb: FormBuilder ,private router: Router) {
    this.createDirectionForm();
    
  }
  
  createDirectionForm() {
    this.directionForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required]
    });
  }
  ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 15,
      center: {lat: -33.03, lng: -71.53}
    });
    this.directionsDisplay.setMap(map);
  }
  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: formValues.source,
      destination: formValues.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
    guardarrecorido(formValues){
      const min = 500;
      const max = 3500;
      let x = Math.floor(Math.random()*(max-min+1)+min);
      const navigationExtras: NavigationExtras = {
        state: {
          ubicacionViajes: formValues.destination,
          precioViajes: x
        }
      };
      this.router.navigate(['home/pviajes'], navigationExtras);
    }
  ngOnInit() {
  }
}