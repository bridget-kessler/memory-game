import { useContext, useState } from "react";
import { GameContext } from "../contexts/gameContext";
import { LevelContext } from "../contexts/levelContext";
import { SwipeableDrawer } from "@mui/material";
import ArtDetails from "./ArtDetails";
import { ArtContext } from "../contexts/artContext";
import { IArtCard } from "../types/types";
import { CgClose } from "react-icons/cg";
import formatTime from "../utils/formatTime";

type Props = {
  exitAnimation?: () => void;
};

const GameOver = ({ exitAnimation }: Props) => {
  const { transitionGame, bestTime } = useContext(GameContext);
  const { difficulty } = useContext(LevelContext);
  const { artCards, category, art } = useContext(ArtContext);
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
        <button className="flex items-center gap-2 w-fit" onClick={() => setOpen(false)}>
          <CgClose />
          Close
        </button>
        <ArtDetails selectedArtId={selectedArt} />
      </SwipeableDrawer>
      <div className="max-w-[27rem] mx-auto">
        <h1>Game Over</h1>
        <p>Category: {category}</p>
        <p >Time elapsed: {formatTime(bestTime[difficulty])}</p>
        <h2>Cards From This Round</h2>
        <p>
          Each card includes a close up of a famous work of art. Click on the
          cards below to learn more about each piece of art.
        </p>
        <div
          className={`grid gap-4 w-fit max-w-full mt-5 mb-5 grid-rows-cards grid-cols-cards`}
        >
          {artCards?.map((artCard: IArtCard) => {
            return (
              <button
                key={artCard.key}
                aria-label={art?.filter(el => el.title === artCard.id)[0].alt_text}
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
          onClick={() =>{
            transitionGame("start")
            if (exitAnimation) {
                exitAnimation()
            }
          } }
          className="bg-black text-white px-3 py-1 rounded-full mt-5"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
