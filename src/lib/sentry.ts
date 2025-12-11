import * as Sentry from '@sentry/nextjs';
import { Sen } from 'next/font/google';

Sentry.init({
    dsn: process.env.SENTRY_DSN || '',
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

export default Sentry;