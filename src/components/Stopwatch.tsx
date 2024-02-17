import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";
import { levels, levelsArray } from "../types/types";
import { LevelContext } from "../contexts/levelContext";
import formatTime from "../utils/formatTime";

type Props = {
  isPaused: boolean;
  score: number;
};

const Stopwatch = ({ isPaused, score }: Props) => {
  const { setBestTime, bestTime } = useContext(GameContext);
  const { gridSize, difficulty } = useContext(LevelContext);
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
        if ( time < bestTime[difficulty]) {
            setBestTime({ ...bestTime, [difficulty]: time });
        }
    }
  }, [score]);

  return (
    <>
      <span className="sr-only">
        Time elapsed: {formatTime(time)}
      </span>
      <div role="timer" aria-hidden>
        <span>{minutes} : </span>
        <span>{seconds} : </span>
        <span>{milliseconds}</span>
      </div>
    </>
  );
};

export default Stopwatch;
