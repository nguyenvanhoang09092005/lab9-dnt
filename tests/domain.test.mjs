import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePlace, parseWeather, weatherInfo } from '../src/utils/weather.ts';
test('weather rejects missing and malformed API responses', () => {
  assert.throws(() => parsePlace({ results: [] }));
  assert.throws(() =>
    parsePlace({ results: [{ name: 'X', latitude: 100, longitude: 0 }] }),
  );
  assert.throws(() => parseWeather({ current: { temperature_2m: null } }));
});
test('weather parses valid places, values and snow showers', () => {
  assert.deepEqual(
    parsePlace({
      results: [
        {
          name: 'Đà Nẵng',
          country: 'Việt Nam',
          latitude: 16.06,
          longitude: 108.2,
        },
      ],
    }),
    { name: 'Đà Nẵng', country: 'Việt Nam', latitude: 16.06, longitude: 108.2 },
  );
  assert.equal(
    parseWeather({
      current: {
        temperature_2m: 25,
        relative_humidity_2m: 70,
        wind_speed_10m: 8,
        weather_code: 0,
      },
    }).temperature,
    25,
  );
  assert.equal(weatherInfo(85).label, 'Có tuyết');
});
