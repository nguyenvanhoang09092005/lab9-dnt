import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

// Keep the initial browser render consistent with Expo's static HTML.
export function useColorScheme() {
  const hydrated = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const scheme = useRNColorScheme();
  return hydrated ? scheme : 'light';
}
