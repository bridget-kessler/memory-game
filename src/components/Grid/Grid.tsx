import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useArtContext } from "../../contexts/ArtContext";
import { useLevelContext } from "../../contexts/LevelContext";
import AriaLiveRegion from "../layout/AriaLiveRegion";
import shuffleArray from "../../utils/shuffleArray";
import uniqid from "uniqid";
import { IArtCard } from "../../types/types";

type Props = {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  isPaused: boolean;
};

const Grid = ({ score, setScore, isPaused }: Props) => {
  const { gridSize } = useLevelContext();
  const { artCards } = useArtContext();
  const [cardDeck, setCardDeck] = useState<IArtCard[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [targetIds, setTargetIds] = useState<string[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const [ariaMessage, setAriaMessage] = useState("");

  useEffect(() => {
    if (artCards?.length >= Math.pow(gridSize, 2) / 2) {
      // Double the deck and update each key to be unique
      const duplicateArtCards: IArtCard[] = [
        ...artCards.slice(0).map((el) => ({ ...el, key: uniqid() })),
      ];
      setCardDeck(shuffleArray([...artCards, ...duplicateArtCards]));
    }
  }, [artCards?.length]);

  useEffect(() => {
    if (targetIds.length === 1) {
      setAriaMessage("");
    }
    if (targetIds.length === 2) {
      setAriaMessage(
        targetIds[0] === targetIds[1] ? "Match Found" : "No Match Found"
      );

      setTimeout(() => {
        setSelected([]);
        setTargetIds([]);
        if (targetIds[0] === targetIds[1]) {
          setMatches((prev) => [...matches, targetIds[0]]);
          setScore(score + 1);
        }
      }, 1500);
    }
  }, [targetIds.length]);

  return (
    <>
      <AriaLiveRegion>{ariaMessage}</AriaLiveRegion>
      <div
        data-testid="grid"
        className={`grid w-full m-auto gap-4 max-w-full justify-center grid-rows-cards grid-cols-cards`}
        style={{
          maxWidth: `${gridSize * 6 + gridSize - 1}rem`,
        }}
      >
        {cardDeck?.map((artCard: IArtCard, i) => {
          return (
            <button
              data-testid={"button"}
              aria-label={
                selected.includes(artCard.key)
                  ? `Card ${i + 1} value is ${artCard.title}`
                  : `Flip Card ${i + 1}`
              }
              key={artCard.key}
              id={`${artCard.id}`}
              className={"card transition rounded-md w-[6rem] h-[6rem]"}
              style={{
                cursor:
                  matches.includes(artCard.id) ||
                  selected.includes(artCard.key) ||
                  isPaused || selected.length === 2 || matches.includes(artCard.id)
                    ? "default"
                    : "pointer",
                opacity: matches.includes(artCard.id) ? 0 : 1,
              }}
              onClick={() => {
                if (!selected.includes(artCard.key)) {
                  setTargetIds([...targetIds, artCard.id]);
                  setSelected([...selected, artCard.key]);
                }
              }}
              // Announce as pressed only if one card is selected
              aria-pressed={selected.length === 1 && selected.includes(artCard.key) ? true : false}
              // 'Aria-disabled' is the same semantically as 'disabled' but does not prevent focus and click events
              // If only one card is selected, keep if focusable so title is read but announce that toggle is disabled
              aria-disabled={selected.length === 1 && selected.includes(artCard.key)}
              // prevent any interaction a) with face down cards while any two cards are face up or b) when game is paused
              disabled={
                isPaused || (selected.length === 2 && !selected.includes(artCard.key)) || matches.includes(artCard.id)
              }
            >
              {
                <div
                  className="relative w-full h-full transition-transform	duration-700"
                  style={{
                    transform: selected.includes(artCard.key)
                      ? "rotateY(180deg)"
                      : "",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="backface-hidden h-full bg-[rgba(0,0,0,0.05)] bg-[radial-gradient(black_1px,transparent_0)] bg-[length:10px_10px] bg-[position:-19px_-19px] shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px] rounded-md overflow-hidden"></div>
                  <div className="absolute top-0 left-0  h-full w-full backface-hidden bg-transparent rounded-md shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px] overflow-hidden [transform:rotateY(180deg)]">
                    <img
                      src={artCard.img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              }
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
