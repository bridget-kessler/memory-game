import {
  useEffect,
  useState,

  useContext,
} from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import PauseOverlay from "./layout/PauseOverlay";
import { LevelContext } from "../contexts/levelContext";
import { LinearProgress } from "@mui/material";
import { GameContext } from "../contexts/gameContext";
import Navbar from "./layout/Navbar";

type Props = {
  exitAnimation?: () => void;
};

const GameBoard = ({ exitAnimation }: Props) => {
  const { gridSize } = useContext(LevelContext);
  const { transitionGame } = useContext(GameContext);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (Math.pow(gridSize, 2) / 2 === score) {
      transitionGame("over");
      if (exitAnimation) {
        exitAnimation();
      }
    }
  }, [score]);

  return (
    <div className="grid grid-rows-gameboard h-full">
      <Navbar>
        <div className="flex flex-wrap grow items-center gap-x-5">
          <p className="m-0">{"Matches Found: " + score}</p>
          <div className="w-full max-w-60">
            <LinearProgress
              variant="determinate"
              value={(score * 100) / (Math.pow(gridSize, 2) / 2)}
              sx={{
                height: "20px",
                border: "2px solid",
                backgroundColor: "transparent",
                borderRadius: "10px",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "black",
                },
              }}
            />
          </div>
        </div>
        <Controls isPaused={isPaused} setIsPaused={setIsPaused} score={score} exitAnimation={exitAnimation} />
      </Navbar>
      <PauseOverlay isPaused={isPaused}>
        <Grid score={score} setScore={setScore} isPaused={isPaused} />
      </PauseOverlay>
    </div>
  );
};

export default GameBoard;
