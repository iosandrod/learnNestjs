import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

export function middleware(app: INestApplication): INestApplication {
  const isProduction = (process.env.NODE_ENV === 'production');
  app.use(compression());
  app.use(session({
    // Requires 'store' setup for production
    secret: 'tEsTeD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: isProduction },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet({
    contentSecurityPolicy: isProduction ? undefined : false,
    crossOriginEmbedderPolicy: isProduction ? undefined : false,
  }));
  // app.enableCors();

  return app;
}
