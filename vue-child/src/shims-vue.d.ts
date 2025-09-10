declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "host/GlobalStore" {
  interface User {
    name: string;
    role: string;
  }

  interface GlobalState {
    user: User | null;
    theme: string;
  }

  const store: {
    getState: () => GlobalState;
    setState: (state: Partial<GlobalState>) => void;
    subscribe: (cb: (state: GlobalState) => void) => () => void;
  };

  export default store;
}
