import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Linking,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Action,
  Card,
  LabScreen,
  Label,
  Metric,
  Notice,
  ui,
  useLabTheme,
} from '@/components/lab-ui';
import {
  parsePlace,
  parseWeather,
  weatherInfo,
  type Place,
  type Weather,
} from '@/utils/weather';
const cities = [
  { name: 'Đà Nẵng', query: 'Da Nang' },
  { name: 'Hà Nội', query: 'Hanoi' },
  { name: 'TP. Hồ Chí Minh', query: 'Ho Chi Minh City' },
];
export default function WeatherScreen() {
  const t = useLabTheme();
  const [query, setQuery] = useState('Da Nang'),
    [forecast, setForecast] = useState<{
      place: Place;
      weather: Weather;
    } | null>(null);
  const [loading, setLoading] = useState(false),
    [error, setError] = useState('');
  const controller = useRef<AbortController | null>(null),
    sequence = useRef(0);
  useEffect(
    () => () => {
      sequence.current++;
      controller.current?.abort();
    },
    [],
  );
  const search = async (city = query) => {
    Keyboard.dismiss();
    controller.current?.abort();
    const id = ++sequence.current;
    if (!city.trim()) {
      setLoading(false);
      setForecast(null);
      setError('Hãy nhập tên thành phố bạn muốn tìm.');
      return;
    }
    const abort = new AbortController();
    controller.current = abort;
    const timeout = setTimeout(() => abort.abort(), 15000);
    setLoading(true);
    setError('');
    setForecast(null);
    try {
      const placeResponse = await fetch(
        'https://geocoding-api.open-meteo.com/v1/search?name=' +
          encodeURIComponent(city.trim()) +
          '&count=1&language=vi&format=json',
        { signal: abort.signal },
      );
      if (!placeResponse.ok)
        throw new Error('Dịch vụ tìm địa điểm đang bận. Hãy thử lại sau.');
      const place = parsePlace(await placeResponse.json());
      const weatherResponse = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=' +
          place.latitude +
          '&longitude=' +
          place.longitude +
          '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto',
        { signal: abort.signal },
      );
      if (!weatherResponse.ok)
        throw new Error('Dịch vụ thời tiết đang bận. Hãy thử lại sau.');
      const weather = parseWeather(await weatherResponse.json());
      if (sequence.current === id) setForecast({ place, weather });
    } catch (e) {
      if (sequence.current === id)
        setError(
          abort.signal.aborted
            ? 'Kết nối mất quá nhiều thời gian. Hãy thử lại.'
            : e instanceof TypeError
              ? 'Không thể kết nối. Kiểm tra Internet rồi thử lại nhé.'
              : e instanceof Error
                ? e.message
                : 'Không tải được thời tiết. Hãy thử lại.',
        );
    } finally {
      clearTimeout(timeout);
      if (sequence.current === id) {
        setLoading(false);
        controller.current = null;
      }
    }
  };
  const info = forecast ? weatherInfo(forecast.weather.code) : null;
  return (
    <LabScreen>
      <Card>
        <Label>BẠN MUỐN ĐẾN ĐÂU?</Label>
        <TextInput
          accessibilityLabel="Tên thành phố"
          style={[
            ui.input,
            { color: t.text, borderColor: t.border, backgroundColor: t.soft },
          ]}
          placeholder="Tìm một thành phố..."
          placeholderTextColor={t.muted}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => search()}
          returnKeyType="search"
          maxLength={120}
          autoCapitalize="words"
        />
        <Action
          label={loading ? 'Tìm thành phố khác →' : 'Xem thời tiết →'}
          onPress={() => search()}
        />
      </Card>
      {error !== '' && (
        <Card>
          <Notice error>{error}</Notice>
          <Action secondary label="Thử lại" onPress={() => search()} />
        </Card>
      )}
      {loading && (
        <Card style={ui.center}>
          <ActivityIndicator size="large" color={t.accent} />
          <Text
            accessibilityRole="progressbar"
            style={{ color: t.text, fontWeight: '600' }}
          >
            Đang tìm một khoảng trời...
          </Text>
          <Notice>Bạn có thể tìm thành phố khác trong lúc chờ.</Notice>
        </Card>
      )}
      {!loading && forecast && info && (
        <Card style={ui.center}>
          <Label>THỜI TIẾT HIỆN TẠI</Label>
          <Text
            accessibilityRole="header"
            style={[ui.heading, { color: t.text, textAlign: 'center' }]}
          >
            {forecast.place.name}
          </Text>
          <Text style={{ color: t.muted }}>{forecast.place.country}</Text>
          <Text style={{ fontSize: 72 }}>{info.icon}</Text>
          <Text
            accessibilityLiveRegion="polite"
            style={{ fontSize: 72, fontWeight: '800', color: t.accent }}
          >
            {Math.round(forecast.weather.temperature)}°
            <Text style={{ fontSize: 26 }}>C</Text>
          </Text>
          <Text style={{ color: t.text, fontSize: 18 }}>{info.label}</Text>
          <View
            style={[
              ui.row,
              {
                width: '100%',
                borderTopWidth: 1,
                borderTopColor: t.border,
                paddingTop: 16,
              },
            ]}
          >
            <Metric label="Độ ẩm" value={forecast.weather.humidity + '%'} />
            <Metric label="Gió · km/h" value={forecast.weather.wind} />
          </View>
        </Card>
      )}
      {!loading && !forecast && !error && (
        <Card style={ui.center}>
          <Text style={{ fontSize: 64 }}>🌤️</Text>
          <Text style={[ui.heading, { color: t.text }]}>
            Một khoảng trời của bạn.
          </Text>
          <Notice>
            Tìm thành phố để xem thời tiết hiện tại và chuẩn bị cho những kế
            hoạch trong ngày.
          </Notice>
        </Card>
      )}
      <View style={{ gap: 12 }}>
        <Label>ĐIỂM ĐẾN QUEN THUỘC</Label>
        <View style={ui.row}>
          {cities.map((city) => (
            <Pressable
              accessibilityRole="button"
              key={city.query}
              onPress={() => {
                setQuery(city.query);
                search(city.query);
              }}
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 13,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: t.border,
                backgroundColor: t.surface,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ color: t.text, fontSize: 13, fontWeight: '600' }}>
                {city.name} ↗
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel="Nguồn dữ liệu Open-Meteo"
        onPress={() =>
          Linking.openURL('https://open-meteo.com/').catch(() =>
            setError('Không mở được trang Open-Meteo.'),
          )
        }
      >
        <Text
          style={{
            textAlign: 'center',
            color: t.accent,
            fontSize: 12,
            padding: 12,
          }}
        >
          Dữ liệu bởi Open-Meteo ↗
        </Text>
      </Pressable>
    </LabScreen>
  );
}
