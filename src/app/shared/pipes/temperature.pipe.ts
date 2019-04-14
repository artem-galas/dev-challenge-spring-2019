import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  pure: true
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number): string {
    return `${Math.round(value)} °C`;
  }

}
