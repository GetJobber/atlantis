import calculateStrength from "zxcvbn";
export declare function usePasswordStrength(password: string, dictionary?: string[]): {
    guesses: number;
    score: calculateStrength.ZXCVBNScore;
    warning: calculateStrength.ZXCVBNFeedbackWarning;
    suggestions: string[];
    timeToCrack: string | number;
};
