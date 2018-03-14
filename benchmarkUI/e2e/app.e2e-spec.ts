import { AppPage } from './app.po';
import { tick } from '@angular/core/testing';

describe('benchmark-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should clear table history', () => {
    debugger
    page.navigateTo();
    page.setInputForButtonFill();
    page.clickButtonFill()
    page.clickTabsHistory();
    let checkCountRecords = page.countRowRecords()
    expect(checkCountRecords).not.toEqual(0)
    page.clickButtonClearHistory();
    page.tick();
    let countRecord = page.countRowRecords();
    expect(countRecord).toEqual(0);
  });

  it('should add table all operation and check in tables history and session', () => {
    page.navigateTo();
    page.clickTabsHistory();
    let before = page.countRowRecords();
    page.clickTabsSession();
    page.setInputForButtonFill();
    page.clickButtonFill()
    page.setInputForButtonDelete();
    page.clickButtonDeleteEF()
    page.clickButtonDeleteSQL()
    page.clickButtonSelectEF();
    page.clickButtonSelectSQL();
    page.clickButtonFlushEF();
    page.clickButtonFill();
    page.clickButtonFlushSQL();
    page.clickTabsHistory();
    page.tick()
    let afte = page.countRowRecords();
    expect(before).not.toEqual(afte);
  });


});
