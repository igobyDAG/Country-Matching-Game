import { useState } from "react";

import countriesAndCapitals from "../data/countriesAndCapitals.json";
// import countriesAndCapitalsBig from "../data/countriesAndCapitalsBig.json";

import type { locationStatusType } from "../types";
import type { countriesAndCapitalsType } from "../types";

const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const useGameData = () => {
    const baseData: countriesAndCapitalsType = countriesAndCapitals;

    const dataArray = shuffleArray([
        ...Object.keys(baseData),
        ...Object.values(baseData),
    ]);

    const dataStatus = dataArray.map((data) => {
        return { locationName: data, selectionStatus: "default" };
    });
    const [gameStatus, setGameStatus] = useState(dataStatus);

    const conditionallyUpdateSelectionStatus = (
        newValue: string,
        condition: (location: locationStatusType) => boolean
    ) => {
        setGameStatus((prev) =>
            prev.map((location) =>
                condition(location)
                    ? { ...location, selectionStatus: newValue }
                    : location
            )
        );
    };

    const resetErrorStatus = () => {
        conditionallyUpdateSelectionStatus(
            "default",
            (location) => location.selectionStatus === "error"
        );
    };

    const handlePairSelection = (
        result: boolean,
        place1: string,
        place2: string
    ) => {
        const newStatus = result ? "matched" : "error";
        conditionallyUpdateSelectionStatus(
            newStatus,
            (location) =>
                location.locationName === place1 ||
                location.locationName === place2
        );
    };

    return {
        baseData,
        setGameStatus,
        gameStatus,
        handlePairSelection,
        resetErrorStatus,
    };
};

export default useGameData;
