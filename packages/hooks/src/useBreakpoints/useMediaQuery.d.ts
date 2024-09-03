type MediaQuery = `(${string}:${string})`;
export declare const mediaQueryStore: {
    subscribe(onChange: () => void, query: MediaQuery): () => void;
    getSnapshot(query: MediaQuery): () => any;
};
export declare function useMediaQuery(query: MediaQuery): any;
export {};
