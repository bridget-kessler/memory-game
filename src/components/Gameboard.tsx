import { useEffect, useState, useContext } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import PauseOverlay from "./layout/PauseOverlay";
import { LevelContext } from "../contexts/levelContext";
import { AppBar, LinearProgress, Slide } from "@mui/material";
import { GameContext } from "../contexts/gameContext";
import useScrollTrigger from "@mui/material/useScrollTrigger";

type Props = {
  exitAnimation?: () => void;
};

const GameBoard = ({ exitAnimation }: Props) => {
  const trigger = useScrollTrigger();
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
    <div className="grid grid=cols-gameboard h-full">
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
              borderRadius: "3rem"
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
    </div>
  );
};

export default GameBoard;
