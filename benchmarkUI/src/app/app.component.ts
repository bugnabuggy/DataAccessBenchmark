import { Component } from '@angular/core';
import { NavLinks } from './navLinks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {

  navLinks= NavLinks;
 
}
