import { Dispatch, SetStateAction, useContext } from "react";
import Stopwatch from "./Stopwatch";
import { GiPauseButton } from "react-icons/gi";
import { FaUndoAlt } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { GameContext } from "../contexts/gameContext";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { LevelContext } from "../contexts/levelContext";
import {styled} from "@mui/system";

type Props = {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  score: number;
  exitAnimation?: () => void
};

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: ".5rem",
    fontSize: ".75rem",
    padding: ".75rem",
  },
}));

const Controls = ({ isPaused, setIsPaused, score, exitAnimation }: Props) => {
  const { gridSize } = useContext(LevelContext);
  const { transitionGame } = useContext(GameContext);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Stopwatch isPaused={isPaused} score={score} />
      <StyledTooltip title={isPaused ? "Resume" : "Pause"} placement="bottom">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="bg-black rounded-full flex items-center justify-center h-10 w-10"
        >
          {isPaused ? (
            <IoPlay className="fill-stone" />
          ) : (
            <GiPauseButton className="fill-stone" />
          )}
        </button>
      </StyledTooltip>
      <StyledTooltip title="New Game" placement="bottom">
        <button
          onClick={() => {
            transitionGame("start");
            if (exitAnimation) {
              exitAnimation()
            }
          }}
          className="bg-black rounded-full flex items-center justify-center h-10 w-10"
        >
          <FaUndoAlt className="fill-stone" />
        </button>
      </StyledTooltip>
      <StyledTooltip
        title={`There are ${
          Math.pow(gridSize, 2) / 2
        } pairs of matching cards in this deck. Flip over the cards until you've found all the matches! Only two cards can be face up at the same time.`}
        placement="bottom-end"
      >
        <button className="bg-black rounded-full flex items-center justify-center h-10 text-stone px-5">
          Hint
        </button>
      </StyledTooltip>
    </div>
  );
};

export default Controls;
