import { Component } from '@angular/core';
import { NavLinks } from '../models/navLinks';

@Component({
  selector: 'app-root',
  templateUrl: '../components.html/app.component.html',
  styleUrls: ['../styles/app.component.css']
})


export class AppComponent  {

  navLinks= NavLinks;
 
}
