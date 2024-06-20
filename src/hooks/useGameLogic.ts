import { useState, useEffect } from "react";
import { countriesAndCapitalsType } from "../types";

const useGameLogic = () => {
    const [errorCount, setErrorCount] = useState<number>(0);
    const [numberOfMatches, setNumberOfMatches] = useState<number>(0);
    const [isGameInProgress, setIsGameInProgress] = useState<boolean>(true);
    const [hasUserWon, setHasUserWon] = useState<boolean>(false);

    // handle errors. 3 must stop the game
    useEffect(() => {
        if (errorCount === 3) {
            setIsGameInProgress(false);
        }
    }, [errorCount]);

    // handle user winning
    useEffect(() => {
        if (hasUserWon) {
            setIsGameInProgress(false);
        }
    }, [hasUserWon]);

    const handleComparison = (
        gameData: countriesAndCapitalsType,
        value1: string,
        value2: string
    ) => {
        // data structure is data = {country: capital} where data[capital] === capital
        let capital;
        let country;

        if (gameData.hasOwnProperty(value1)) {
            country = value1;
            capital = value2;
        } else {
            // I know if else statements are old-school but this is for express building purposess
            country = value2;
            capital = value1;
        }
        const result = gameData[country] === capital;
        if (result) {
            setNumberOfMatches((prev) => prev + 1);
            console.log("matches", numberOfMatches);
            console.log("correct!");
        } else {
            setErrorCount((prev) => prev + 1);
            console.log("noup");
        }
        return result;
    };


    return {
        errorCount,
        isGameInProgress,
        hasUserWon,
        setIsGameInProgress,
        handleComparison,
        numberOfMatches,
        setNumberOfMatches,
        setHasUserWon,
    };
};

export default useGameLogic;
