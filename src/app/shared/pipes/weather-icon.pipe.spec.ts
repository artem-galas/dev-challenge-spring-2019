import { WeatherIconPipe } from './weather-icon.pipe';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

describe('WeatherIconPipe', () => {
  let pipe: WeatherIconPipe;
  let sanitizer;

  beforeEach(() => {
    sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']);
    sanitizer.bypassSecurityTrustUrl.and.returnValue('SafeUrl');

    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ],
        providers: [
          {
            provide: DomSanitizer,
            useValue: sanitizer
          }
        ]
      });
  });

  beforeEach(() => {
    pipe = new WeatherIconPipe(TestBed.get(DomSanitizer));
  });

  it('should create', () => {
    expect(pipe)
      .toBeTruthy();
  });

  it('should return SafeUrl', () => {
    expect(pipe.transform('unSafeUrl'))
      .toBe('SafeUrl');
  });

});
