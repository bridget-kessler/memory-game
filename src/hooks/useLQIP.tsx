import { useEffect, useState } from "react";

const useLQIP = (imgSrc: string | undefined, lqip: string | undefined, width: number, aspect_ratio: number | undefined ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (imgSrc && lqip && width) {

            const img = new Image();
            img.src = imgSrc;
            img.width = width;
            img.crossOrigin = "anonymous";

            img.onload = function() {
                setIsLoaded(true);
            }
        }
    }, [imgSrc])

    return { src: isLoaded ? imgSrc : lqip, isBlurred: !isLoaded }
}

export default useLQIP;