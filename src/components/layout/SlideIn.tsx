import gsap from "gsap";
import { ReactElement, ReactNode, cloneElement, useContext, useEffect, useLayoutEffect, useRef } from "react"
import { GameContext } from "../../contexts/gameContext";

type Props = {
    children: ReactElement
}

const SlideIn = ({ children }: Props) => {
    const { gameStatus } = useContext(GameContext);
    const ref = useRef<HTMLDivElement>(null);
    const tl = useRef<GSAPTimeline>();

    useLayoutEffect(() => {    
        // useLayoutEffect is guaranteed to run after all DOM mutations and before the browser repaints the screen
        // It can reduce animation glitches in certain cases
        const mediaQueryList = window.matchMedia('(prefers-reduced-motion: no-preference)');
        const noMotionPreference = mediaQueryList.matches;

        if (noMotionPreference) {
            // Check if the user has a preference for reduced animation
            let ctx = gsap.context(() => {
                tl.current = gsap.timeline().from(ref.current, 1, { autoAlpha:0, y: 100, ease: "power4.out"})
            })
    
            return () => ctx.revert(); // cleanup function
        }
    }, [gameStatus]); 

    const exitAnimation = () => {
        tl.current?.reverse()
    }

    return (
        <div className="m-10" ref={ref}>
            {cloneElement(children, {exitAnimation: exitAnimation})}
        </div>
    )
}

//// tl.current?.reverse()
        // setTimeout(() => onGameStatusTransition(), 1000);

export default SlideIn;