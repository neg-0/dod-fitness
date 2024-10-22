import { DefaultApi } from '../api/DefaultApi';
import { MockApi } from './mockApi';

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'https://api.dodfitness.mil/v1';
const useLiveApi = import.meta.env.VITE_USE_LIVE_API === 'true';

class ApiFactory {
  private static liveApi: DefaultApi | null = null;
  private static mockApi: MockApi | null = null;
  private static currentMode: 'live' | 'mock' = useLiveApi ? 'live' : 'mock';
  private static failureCount: number = 0;
  private static MAX_FAILURES = 3;

  static getApi(): DefaultApi {
    if (this.currentMode === 'live') {
      if (!this.liveApi) {
        this.liveApi = new DefaultApi(apiEndpoint);
      }
      return this.liveApi;
    } else {
      if (!this.mockApi) {
        this.mockApi = new MockApi();
      }
      return this.mockApi;
    }
  }

  static setMode(mode: 'live' | 'mock'): void {
    this.currentMode = mode;
    this.failureCount = 0;
  }

  static getMode(): 'live' | 'mock' {
    return this.currentMode;
  }

  static handleApiFailure(): void {
    if (this.currentMode === 'live') {
      this.failureCount++;
      if (this.failureCount >= this.MAX_FAILURES) {
        console.warn('Live API failed repeatedly. Switching to mock API.');
        this.setMode('mock');
      }
    }
  }
}

export default ApiFactory;