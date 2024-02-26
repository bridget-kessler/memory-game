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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (Math.pow(gridSize, 2) / 2 === score) {
      transitionGame("over");
      if (exitAnimation) {
        exitAnimation();
      }
    }
  }, [score]);

  useEffect(() => {
    setVisible(true); // Set visibility on initial render to prevent animation jumpiness... better solution?
  }, [])

  return (
    <div className="grid h-full grid-rows-gameboard" style={{ visibility: visible ? "visible" : "hidden"}}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="sticky"
          className="px-6 py-3 rounded-full backdrop-blur mx-auto self-end"
          sx={{
            "&.MuiPaper-root": {
              width: "fit-content",
              background: "transparent",
              color: "black",
              top: "1rem",
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
      <div className="px-6 w-full sm:w-fit py-3 mx-auto flex h-fit flex-wrap items-center justify-center gap-3 bg-black text-stone rounded-full sticky bottom-5">
        <p className="m-0">{"Matches found: " + score}</p>
        <div className="grow xs:min-w-[6rem] min-w-full">
          <LinearProgress
            className="border border-stone rounded-full"
            variant="determinate"
            value={(score * 100) / (Math.pow(gridSize, 2) / 2)}
            sx={{
              height: "20px",
              backgroundColor: "transparent",
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
