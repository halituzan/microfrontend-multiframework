import { createApp } from 'vue';
import App from './App.vue';

let app: ReturnType<typeof createApp> | null = null;

export function mount(el: Element) {
  app = createApp(App);
  app.mount(el);
}

export function unmount() {
  if (app) {
    app.unmount();
    app = null;
  }
}
