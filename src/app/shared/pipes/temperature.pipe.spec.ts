import { TemperaturePipe } from './temperature.pipe';

describe('TemperaturePipe', () => {
  let pipe: TemperaturePipe;

  beforeEach(() => {
    pipe = new TemperaturePipe();
  });

  it('create an instance', () => {
    expect(pipe)
      .toBeTruthy();
  });

  it('should round value and add °C', () => {
    expect(pipe.transform(20.2))
      .toBe('20 °C');
  });
});
