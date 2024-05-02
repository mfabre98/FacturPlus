import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.facturplus.app',
  appName: 'FacturPlus',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
