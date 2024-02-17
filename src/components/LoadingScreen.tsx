import { useContext } from "react";
import CountDown from "./CountDown";
import { ArtContext } from "../contexts/artContext";

type Props = {
    exitAnimation?: () => void;
}

const LoadingScreen = ({ exitAnimation }: Props) => {
    const { category }  = useContext(ArtContext);

    return (
        <div className="grid grid-rows-loading-screen h-full">
            <CountDown exitAnimation={exitAnimation} />
            <p className="flex flex-col items-end"><span>Category:</span> {category}</p>
        </div>
    )
}

export default LoadingScreen;