export type Place = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};
export type Weather = {
  temperature: number;
  humidity: number;
  wind: number;
  code: number;
};
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object')
    throw new Error('Dữ liệu thời tiết không hợp lệ.');
  return value as Record<string, unknown>;
}
function numeric(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new Error('Dữ liệu thời tiết chưa đầy đủ.');
  return value;
}
export function parsePlace(value: unknown): Place {
  const data = object(value);
  if (!Array.isArray(data.results) || !data.results.length)
    throw new Error('Không tìm thấy thành phố. Hãy thử tên khác nhé.');
  const p = object(data.results[0]);
  if (typeof p.name !== 'string')
    throw new Error('Thông tin thành phố không hợp lệ.');
  const latitude = numeric(p.latitude),
    longitude = numeric(p.longitude);
  if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180)
    throw new Error('Tọa độ thành phố không hợp lệ.');
  return {
    name: p.name,
    country: typeof p.country === 'string' ? p.country : '',
    latitude,
    longitude,
  };
}
export function parseWeather(value: unknown): Weather {
  const c = object(object(value).current);
  return {
    temperature: numeric(c.temperature_2m),
    humidity: numeric(c.relative_humidity_2m),
    wind: numeric(c.wind_speed_10m),
    code: numeric(c.weather_code),
  };
}
export function weatherInfo(code: number) {
  if (code === 0) return { icon: '☀️', label: 'Trời quang' };
  if (code === 1 || code === 2) return { icon: '🌤️', label: 'Có mây rải rác' };
  if (code === 3) return { icon: '☁️', label: 'Nhiều mây' };
  if (code === 45 || code === 48) return { icon: '🌫️', label: 'Sương mù' };
  if (code >= 51 && code <= 57) return { icon: '🌦️', label: 'Mưa phùn' };
  if (code >= 61 && code <= 67) return { icon: '🌧️', label: 'Có mưa' };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return { icon: '❄️', label: 'Có tuyết' };
  if (code >= 80 && code <= 82) return { icon: '🌦️', label: 'Mưa rào' };
  if (code === 95 || code === 96 || code === 99)
    return { icon: '⛈️', label: 'Dông' };
  return { icon: '🌡️', label: 'Điều kiện hiện tại' };
}
