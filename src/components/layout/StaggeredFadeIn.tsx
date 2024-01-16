// import gsap from "gsap";
// import { ReactElement, ReactNode, cloneElement, useContext, useEffect, useLayoutEffect, useRef } from "react"
// import { GameContext } from "../../contexts/gameContext";

// type Props = {
//     children: ReactElement
// }

// const StaggeredFadeIn = ({ children }: Props) => {
//     const ref = useRef<HTMLDivElement>(null);
//     const tl = useRef<GSAPTimeline>();
    

//     useLayoutEffect(() => {    
//         // useLayoutEffect is guaranteed to run after all DOM mutations and before the browser repaints the screen
//         // It can reduce animation glitches in certain cases
//         const mediaQueryList = window.matchMedia('(prefers-reduced-motion: no-preference)');
//         const noMotionPreference = mediaQueryList.matches;

//         if (noMotionPreference) {
//             // Check if the user has a preference for reduced animation
//             let ctx = gsap.context(() => {
//                 tl.current = gsap.timeline().to(ref.current.children.children, {
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
//     }, []); 

//     const exitAnimation = () => {
//         tl.current?.reverse()
//     }

//     return (
//         <div className="" ref={ref}>
//             {cloneElement(children, {exitAnimation: exitAnimation})}
//         </div>
//     )
// }

// export default StaggeredFadeIn;