import { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useLevelContext } from "../contexts/LevelContext";
import { SwipeableDrawer } from "@mui/material";
import ArtDetails from "./ArtDetails";
import { useArtContext } from "../contexts/ArtContext";
import { IArtCard } from "../types/types";
import { CgClose } from "react-icons/cg";
import formatTime from "../utils/formatTime";

type Props = {
  exitAnimation?: () => void;
};

const GameOver = ({ exitAnimation }: Props) => {
  const { transitionGame } = useGameContext();
  const { timeElapsed, newRecord, difficulty } = useLevelContext();
  const { artCards, category } = useArtContext();
  const [open, setOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState<string>("");

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <SwipeableDrawer
        anchor="right"
        open={open}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{
          "& .MuiPaper-root": {
            width: "min(100%,40rem)",
            padding: "3rem",
            background: "#e6e1dd",
          },
        }}
      >
        <button
          className="flex items-center gap-2 w-fit"
          onClick={() => setOpen(false)}
        >
          <CgClose />
          Close
        </button>
        <ArtDetails selectedArtId={selectedArt} />
      </SwipeableDrawer>
      <div className="max-w-[27rem] mx-auto my-5">
        <h1>Game Over</h1>
        <span className="border border-black text-sm  rounded-md py-1 px-2 mr-2 capitalize">
          Category: {category}
        </span>
        <span className="border border-black text-sm  rounded-md py-1 px-2 mr-2 capitalize">
          Difficulty: {difficulty}
        </span>
        <p className="pt-3">
          {newRecord && (
            <span className="bg-[rgb(56,139,218)] text-stone text-sm rounded-md py-1 px-2 mr-2">
              New Record
            </span>
          )}
          {formatTime(timeElapsed) &&
            `Time elapsed: ${formatTime(timeElapsed)}`}
        </p>
        <h2>Cards From This Round</h2>
        <p>
          Each card includes a close up of a famous work of art. Click on the
          cards below to learn more about each piece of art.
        </p>
        <div
          className={`grid gap-4 w-fit max-w-full mt-5 mb-5 grid-cols-cards`}
        >
          {artCards?.map((artCard: IArtCard) => {
            return (
              <button
                key={artCard.key}
                aria-label={artCard.title}
                aria-pressed={open && selectedArt === artCard.id}
                className="w-full h-full rounded-md overflow-hidden"
                onClick={() => {
                  setSelectedArt(artCard.id);
                  setOpen(true);
                }}
              >
                <img src={artCard.img} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            transitionGame("start");
            if (exitAnimation) {
              exitAnimation();
            }
          }}
          className="bg-black text-white px-3 py-1 rounded-full mt-5"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
