import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.round(value / 60);
    const seconds = value % 60;
    return this.pad(minutes) + ':' + this.pad(seconds);
  }

  private pad(n: number): string {
    if (n < 10) return '0' + n;
    else return `${n}`;
  }

}
