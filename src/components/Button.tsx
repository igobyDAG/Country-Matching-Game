import classNames from "classnames";
import { useEffect, useState } from "react";

interface ButtonProps {
    location: string;
    handleAddData: (data: string) => void;
    selectionStatus: string;
}

export const Button = ({
    location,
    handleAddData,
    selectionStatus,
}: ButtonProps) => {
    const [buttonState, setButtonState] = useState<string>(selectionStatus);

    useEffect(() => {
        setButtonState(selectionStatus);
    }, [selectionStatus]);

    const buttonClass = classNames(
        `bg-${buttonState}`,
        `text-${buttonState === "default" ? "black" : "white"}`,
        "border-black rounded-lg w-32 h-20 border-2 border-black"
    );

    const handleButtonClick = (location: string) => {
        setButtonState("selected");
        handleAddData(location);
    };

    return (
        <button
            onClick={() => handleButtonClick(location)}
            className={buttonClass}
            disabled={selectionStatus === "matched"}
        >
            {location}
        </button>
    );
};
