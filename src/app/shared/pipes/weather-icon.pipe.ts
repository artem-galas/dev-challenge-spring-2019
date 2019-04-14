import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'weatherIcon',
  pure: true
})
export class WeatherIconPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(icon: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`//openweathermap.org/img/w/${icon}.png`);
  }

}
