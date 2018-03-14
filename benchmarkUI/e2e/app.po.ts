import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }


  clickTabsHistory(){
    return element.all(by.css('a.mat-tab-link')).get(1).click();
  }

  clickTabsSession(){
    return element.all(by.css('a.mat-tab-link')).get(0).click();
  }

  clickButtonFill(){
    return element(by.css('button')).click();
  }

  clickButtonClearHistory(){
    return element(by.css('button')).click();
  }

  clickButtonDeleteEF(){
    return element.all(by.css('button')).get(1).click();
  }

  clickButtonDeleteSQL(){
    return element.all(by.css('button')).get(2).click();
  }
  clickButtonSelectEF(){
    return element.all(by.css('button')).get(3).click();
  }

  clickButtonSelectSQL(){
    return element.all(by.css('button')).get(4).click();
  }

  clickButtonFlushEF(){
    return element.all(by.css('button')).get(5).click();
  }

  clickButtonFlushSQL(){
    return element.all(by.css('button')).get(6).click();
  }

  setInputForButtonFill(){
    return element(by.css('input')).sendKeys(20);
  }

  setInputForButtonDelete(){
    return element.all(by.css('input')).get(1).sendKeys(5);
  }

  

 
  tick(){
    return browser.waitForAngular();
  }

 

  countRowRecords(){
    let test = element.all(by.tagName('mat-row'));
    return test.count();
  }


}
