/// <reference types="react" />
/// <reference types="react" />
export declare const Breakpoints: {
    base: number;
    small: number;
    smaller: number;
    large: number;
    larger: number;
};
interface ResizeObserverProps {
    widths?: object;
    heights?: object;
}
export declare function useResizeObserver<T extends HTMLElement>({ widths, heights, }?: ResizeObserverProps): readonly [import("react").RefObject<T>, {
    width: number | undefined;
    height: number | undefined;
    exactWidth: number | undefined;
    exactHeight: number | undefined;
}];
export {};
