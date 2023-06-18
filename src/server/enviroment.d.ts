declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MONGO_URI?: string;
      PORT?: string;
      WEATHER_API_KEY: string;
    }
  }
}

export {}