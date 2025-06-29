// src/main.ts

import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { isDevMode } from '@angular/core';

async function enableMocking() {
  if (!isDevMode()) {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
      options: {
        scope: '/'
      }
    },
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
});