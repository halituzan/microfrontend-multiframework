type Listener<T> = (state: T) => void;

interface User {
    name: string;
    role: string;
}

interface GlobalState {
    user: User | null;
    theme: string;
}

class GlobalStore<T extends Record<string, unknown>> {
    private state: T;
    private listeners: Set<Listener<T>> = new Set();

    constructor(initialState: T) {
        this.state = initialState;
    }

    getState(): T {
        return this.state;
    }

    setState(newState: Partial<T>): void {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(listener => listener(this.state));
    }

    subscribe(listener: Listener<T>): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}

const store = new GlobalStore<GlobalState & Record<string, unknown>>({
    user: null,
    theme: "light",
});

export default store;
