import { Component, DoCheck } from '@angular/core';
import { NavLinks } from '../models/navLinks';
import { SiteDataService } from '../services/siteDataService'

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../styles/app.component.css']
})


export class AppComponent implements DoCheck {
  isSpinnerAction:boolean;
  constructor(
    private siteDataService :SiteDataService 
){}
ngDoCheck(): void {
    this.isSpinnerAction = this.siteDataService.isSpinnerVisible;
  }
  
  navLinks = NavLinks;
 
}
