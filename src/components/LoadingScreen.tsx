import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import ArtDetails from "./ArtDetails";
import CountDown from "./CountDown";
import { ArtContext } from "../contexts/artContext";
import useSplitImage from "../hooks/useSplitImg";

type Props = {
    exitAnimation?: () => void;
}

const LoadingScreen = ({ exitAnimation }: Props) => {
    const artCards = useSplitImage();
    const { setArtCards, category }  = useContext(ArtContext);
    
    useEffect(() => {
        setArtCards(artCards)
    }, [artCards])
    
    return (
        <div className="grid grid-rows-loading-screen h-full">
            <CountDown exitAnimation={exitAnimation} />
            <p className="flex flex-col items-end"><span>Category:</span> {category}</p>
        </div>
    )
}

export default LoadingScreen;