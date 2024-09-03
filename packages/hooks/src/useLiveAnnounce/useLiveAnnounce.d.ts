/**
 * Announce a message on voice over whenever you do an action. This is
 * especially helpful when you have an action that adds or deletes an element
 * from the screen.
 */
export declare function useLiveAnnounce(): {
    liveAnnounce: (message: string) => void;
};
