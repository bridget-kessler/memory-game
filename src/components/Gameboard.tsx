import { useEffect, useState } from "react";
import Grid from "./Grid/Grid";
import Controls from "./Controls";
import PauseOverlay from "./layout/PauseOverlay";
import { useLevelContext } from "../contexts/LevelContext";
import { AppBar, LinearProgress, Slide } from "@mui/material";
import { useGameContext } from "../contexts/GameContext";
import useScrollTrigger from "@mui/material/useScrollTrigger";

type Props = {
  exitAnimation?: () => void;
};

const GameBoard = ({ exitAnimation }: Props) => {
  const trigger = useScrollTrigger(); // AppBar will be hidden when scrolling down on mobile
  const { gridSize } = useLevelContext();
  const { transitionGame } = useGameContext();
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
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="sticky"
          sx={{
            "&.MuiPaper-root": {
              top: "1rem",
              height: "fit-content",
              width: "fit-content",
              padding: ".6rem 1rem",
              background: "transparent",
              backdropFilter: "blur(5px)",
              color: "black",
              margin: "auto",
              borderRadius: "3rem",
            },
          }}
        >
          <Controls
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            score={score}
            exitAnimation={exitAnimation}
          />
        </AppBar>
      </Slide>
      <PauseOverlay isPaused={isPaused}>
        <Grid score={score} setScore={setScore} isPaused={isPaused} />
      </PauseOverlay>
      <div className="m-auto flex items-center justify-center w-[18rem] gap-5 bg-black text-stone px-4 py-2 rounded-full sticky bottom-2">
        <p className="m-0">{"Matches found: " + score}</p>
        <div className="grow">
          <LinearProgress
            variant="determinate"
            value={(score * 100) / (Math.pow(gridSize, 2) / 2)}
            sx={{
              height: "20px",
              border: "1px solid #e6e1dd",
              backgroundColor: "transparent",
              borderRadius: "10px",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#e6e1dd",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
