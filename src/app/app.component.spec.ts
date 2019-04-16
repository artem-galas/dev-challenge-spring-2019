import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

  it('should has header "Weather Forecast"', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('header').textContent)
      .toContain('Weather Forecast');
  });

  it('should contain content', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('dev-challenge-weather-forecast'))
      .toBeTruthy();
  });
});
