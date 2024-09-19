import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { authApiMocks } from './api/auth-api';
import ExtendedMockAdapter from './ExtendedMockAdapter';

const baseURL = '/mock-api';
const mockAdapterOptions = {
  delayResponse: 0,
};

type MockAdapterProviderProps = {
  enabled?: boolean;
  children: React.ReactNode;
};

const mock = new ExtendedMockAdapter(axios, mockAdapterOptions, baseURL);

function MockAdapterProvider(props: MockAdapterProviderProps) {
  const { enabled = true, children } = props;
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);
  useEffect(() => {
    const setupAllMocks = () => {
      [authApiMocks].forEach((mockSetup) => {
        mockSetup(mock);
      });
    };

    if (enabled) {
      setupAllMocks();
      mock.onAny().passThrough();
    } else {
      mock.restore();
    }

    setLoading(false);
    isInitialMount.current = false;

    return () => {
      if (!enabled && mock) {
        mock.restore();
      }

      setLoading(false);
    };
  }, [enabled]);

  // useEffect(() => {
  // 	if (import.meta.hot) {
  // 		if (!isInitialMount.current) {
  // 			dispatch(apiService.util.resetApiState());
  // 		}
  // 		isInitialMount.current = false;
  // 	}
  // }, [dispatch]);

  return loading ? <h1>Loading...</h1> : children;
}

export default MockAdapterProvider;
