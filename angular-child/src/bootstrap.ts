import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

export const bootstrap = (container?: HTMLElement) => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
      const appElement = document.createElement('app-root');
      container?.appendChild(appElement);
    })
    .catch((err) => console.error(err));
};
