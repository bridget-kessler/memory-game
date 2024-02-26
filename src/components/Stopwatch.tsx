import { useEffect, useState } from "react";
import { useLevelContext } from "../contexts/LevelContext";
import formatTime from "../utils/formatTime";

type Props = {
  isPaused: boolean;
  score: number;
};

const Stopwatch = ({ isPaused, score }: Props) => {
  const { setTimeElapsed, gridSize } = useLevelContext();
  const [time, setTime] = useState(0);
  let minutes = Math.floor(time / 60000)
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor((time % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  let milliseconds = Math.floor((time % 1000) / 10)
    .toString()
    .padStart(2, "0");

  useEffect(() => {
    let timer: any = null;

    if (!isPaused) {
      if (time > 0) {
      }
      timer = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (Math.pow(gridSize, 2) / 2 === score) {
        setTimeElapsed(time)
    }
  }, [score]);

  return (
    <>
      <span className="sr-only">
        Time elapsed: {formatTime(time)}
      </span>
      <div role="timer" className="text-center" aria-hidden>
        <span>{minutes} : </span>
        <span>{seconds} : </span>
        <span>{milliseconds}</span>
      </div>
    </>
  );
};

export default Stopwatch;
