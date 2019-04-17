import { browser, by, element } from 'protractor';

export class AppPage {
  private get autCompleteSelector() {
    return 'dev-challenge-city-autocomplete mat-autocomplete';
  }

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<string>;
  }

  getTitleText() {
    return element(by.css('header'))
      .getText() as Promise<string>;
  }

  getAutoComplete() {
    return element(by.tagName(this.autCompleteSelector));
  }

  getAutoCompleteInput() {
    return element(by.tagName(`dev-challenge-city-autocomplete mat-form-field input`));
  }

  getAutoCompleteOptions() {
    return element.all(by.tagName(`.mat-autocomplete-panel.mat-autocomplete-visible mat-option`));
  }

  getWeatherCards() {
    return element.all(by.tagName('mat-card'));
  }
}
