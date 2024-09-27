declare namespace NodeJS {
    interface ProcessEnv {
      SENDGRID_MAIL_API_KEY: string;
      JWT_SECRET: string;
    }
  }