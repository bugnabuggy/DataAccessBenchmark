import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToSession() {
    return browser.get('/Session');
  }
  navigateToHistory(){
    return browser.get('/History');
  }

  navigateTo(){
    return browser.get('/');
  }
  
  nextPageToHistory(){
    return element.all(by.css('app-root a.mat-tab-link')).get(1)
  }

  nextToPageToSession(){
    
  }

  clickButtonFill(){
    return element(by.css('button.mat-raised-button'));
  }
  inputForButtunFill(){
    return element(by.css('input')).sendKeys(50)
  }

  addTable(){
    return element.all(by.tagName('mat-row')).count;
  }

  getOpenHistory(){
    return element(by.tagName('app-history'));
  }

  getParagraphText() {
    return element(by.css('app-session mat-list-item')).getText();
  }

}
