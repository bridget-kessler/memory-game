import { useRef, useEffect, useState } from 'react';
import { useGameContext } from '../contexts/GameContext';

type Props = {
    exitAnimation?: () => void;
}

const CountDown = ({ exitAnimation }: Props) => {
    const [countdown, setCountdown] = useState<number>(3);
    const { transitionGame } = useGameContext()
    const intervalRef= useRef<ReturnType<typeof setInterval>>()

    useEffect(() => {
        if (countdown === 0) {
            clearInterval(intervalRef.current);
            transitionGame("active");
            if (exitAnimation) {
                exitAnimation()
            }
        }
    }, [countdown])

    useEffect(() => {
        if (countdown === 3) {
            intervalRef.current = setInterval(() => {
                setCountdown((countdown) => countdown - 1);
            }, 1000)
            
            return () => clearInterval(intervalRef.current)
        }
    }, [])

    return (
        
        <div role="timer" className='text-giant flex justify-center items-center'>
            {countdown}
        </ div> 
    );
}

export default CountDown;