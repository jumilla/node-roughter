export declare class Router {
    private window;
    private routes;
    private onHashChanged;
    constructor(window: Window);
    hash(path: string, callback: (...args: any[]) => void): void;
    hashpath(): string;
    start(): void;
    stop(): void;
    dispatch(path: string): void;
}
