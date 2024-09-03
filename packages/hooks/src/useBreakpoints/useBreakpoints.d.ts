export declare const BREAKPOINT_SIZES: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
/**
 * Hook equivalent of CSS media queries with our
 * [supported breakpoints](https://atlantis.getjobber.com/?path=/docs/design-breakpoints--docs).
 */
export declare function useBreakpoints(): {
    smallAndUp: any;
    mediumAndUp: any;
    largeAndUp: any;
    extraLargeAndUp: any;
    extraSmallOnly: any;
    smallOnly: any;
    mediumOnly: any;
    largeOnly: any;
};
