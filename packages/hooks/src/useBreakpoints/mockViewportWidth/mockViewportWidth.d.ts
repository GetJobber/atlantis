export declare function mockViewportWidth(): {
    cleanup: typeof cleanup;
    setViewportWidth: typeof setViewportWidth;
};
declare function setViewportWidth(newWidth: number): void;
declare function cleanup(): void;
export declare function isQueryMatching(query: string): boolean | undefined;
export {};
