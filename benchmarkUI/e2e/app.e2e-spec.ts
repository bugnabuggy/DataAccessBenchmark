import { AppPage } from './app.po';

describe('benchmark-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    page.inputForButtunFill();
    debugger
    var before = page.addTable()
    page.clickButtonFill().click();
    var afte = page.addTable()
    expect(before.length+1).toEqual(afte.length);
  });
});
