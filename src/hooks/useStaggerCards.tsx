// import { useEffect, useRef, useState, RefObject, MutableRefObject, useLayoutEffect, useContext  } from "react";
// import { IArt } from "../types/types";
// import gsap from "gsap";
// import { LevelContext } from "../contexts/levelContext";

// const useStaggeredCards = ({ cards }) => {
//     const tl = useRef<GSAPTimeline>();
//     const { gridSize } = useContext(LevelContext);

//     useLayoutEffect(() => {    
//         console.log({cards})
//         if (cards?.length === Math.pow(gridSize, 2)) {
//         // useLayoutEffect is guaranteed to run after all DOM mutations and before the browser repaints the screen
//         // It can reduce animation glitches in certain cases
//         const mediaQueryList = window.matchMedia('(prefers-reduced-motion: no-preference)');
//         const noMotionPreference = mediaQueryList.matches;

//         if (noMotionPreference) {
//             // Check if the user has a preference for reduced animation
//             let ctx = gsap.context(() => {
//                 tl.current = gsap.timeline().to(cards.current, {
//                     duration: 1,
//                     scale: 0.1,
//                     y: 40,
//                     ease: "power1.inOut",
//                     stagger: {
//                       grid: [7,15],
//                       from: "end",
//                       axis: "y",
//                       ease: "power2.in",
//                       amount: 1.5
//                     }
//                   });
//             })
    
//             return () => ctx.revert(); // cleanup function
//         }
//         }
//     }, [cards?.length]); 

//     const exitAnimation = () => {
//         tl.current?.reverse()
//     }
//     return { exitAnimation }
            
// }

// export default useStaggeredCards;