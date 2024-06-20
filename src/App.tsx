import { useEffect, useMemo, useState } from "react";

import { Button } from "./components/Button";
import useGameData from "./hooks/useGameData";
import useGameLogic from "./hooks/useGameLogic";

function App() {
    const { baseData, gameStatus, handlePairSelection, resetErrorStatus } =
        useGameData();

    const {
        errorCount,
        isGameInProgress,
        hasUserWon,
        handleComparison,
        numberOfMatches,
        setHasUserWon,
    } = useGameLogic();

    const [comparisonGroup, setComparisonGroup] = useState<string[]>([]);

    // Winning is achieved by getting the amount of matching countries to be the same as the number of keys in the data
    const matchesToWin = useMemo(() => {
        return Object.keys(baseData).length;
    }, []);

    useEffect(() => {
        if (numberOfMatches === matchesToWin) {
            setHasUserWon(true);
        }
    }, [numberOfMatches]);

    // Check if there is a match between buttons
    useEffect(() => {
        if (comparisonGroup.length === 2) {
            const [value1, value2] = comparisonGroup;

            const result = handleComparison(baseData, value1, value2);
            handlePairSelection(result, value1, value2);
            setComparisonGroup([]);
        }
    }, [comparisonGroup]);

    // add to comparison group
    const addToGroup = (data: string) => {
        resetErrorStatus();
        if (comparisonGroup.length < 2 && !comparisonGroup.includes(data)) {
            setComparisonGroup((prev) => {
                return [...prev, data];
            });
        }
    };
    console.log(comparisonGroup);
    return (
        <main className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold">Country Guesser Game</h1>
            {isGameInProgress ? (
                <div className="grid grid-flow-row grid-cols-3 gap-10">
                    {gameStatus.map((location) => (
                        <Button
                            location={location.locationName}
                            handleAddData={addToGroup}
                            selectionStatus={location.selectionStatus}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center ">
                    {hasUserWon ? <div>Winner!</div> : <div>You lost</div>}
                    <button
                        className="bg-slate-400 text-white rounded-lg h-8 w-24 border-2 border-black"
                        onClick={() => location.reload()}
                    >
                        Try Again!
                    </button>
                </div>
            )}
            <h2>{`Error count: ${errorCount}`}</h2>
        </main>
    );
}

export default App;
