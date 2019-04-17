import { browser, logging } from 'protractor';

import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('initial app', () => {
    it('should display title on header', () => {
      page.navigateTo();
      expect(page.getTitleText())
        .toEqual('Weather Forecast');
    });

    it('should display initial data on the page', () => {
      page.navigateTo();
      browser.sleep(300);

      expect(page.getWeatherCards()
        .count())
        .toBe(2);
    });
  });

  describe('autocomplete', () => {
    it('should display autocomplete', () => {
      page.navigateTo();
      browser.sleep(300);
      expect(page.getAutoComplete())
        .toBeTruthy();
    });

    it('typed to autocomplete and select value', () => {
      page.navigateTo();
      browser.sleep(300);
      const autoCompleteInput = page.getAutoCompleteInput();

      autoCompleteInput.clear();

      autoCompleteInput.sendKeys('London');

      browser.sleep(300);

      const autoCompleteOptions = page.getAutoCompleteOptions();

      expect(autoCompleteOptions.count())
        .toBeGreaterThan(0);

      const firstOption = autoCompleteOptions.get(0);

      firstOption.click();
    });
  });

  afterEach(async () => {
    const logs = await browser.manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not
      .toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
