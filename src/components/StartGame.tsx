import { useState, FormEvent } from "react";
import { levels, levelsArray, tLevelsKey } from "../types/types";
import { useLevelContext } from "../contexts/LevelContext";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useGameContext } from "../contexts/GameContext";

type Props = {
  exitAnimation?: () => void;
};

const StartGame = ({ exitAnimation }: Props) => {
  const { setLevel } = useLevelContext();
  const { transitionGame } = useGameContext();
  const [selectedLevel, setSelectedLevel] = useState<tLevelsKey>("easy");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedLevel) {
      setLevel({
        difficulty: selectedLevel,
        gridSize: levels[selectedLevel],
      });
    }
    transitionGame("loading");
    if (exitAnimation) {
      exitAnimation();
    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto w-fit flex flex-col justify-center h-full">
        <h1>Memory Game</h1>
        <form className="" onSubmit={handleSubmit}>
          <label className="mt-3 text-neutral-600" id="radio-group-label">
            Select a Difficulty Level:
          </label>
          <RadioGroup
            row
            aria-labelledby="radio-group-label"
            name="radio-buttons-group"
            className="mb-6"
          >
            {levelsArray.map((level, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={level[0]}
                  checked={selectedLevel === level[0] ? true : false}
                  onChange={() => setSelectedLevel(level[0])}
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "rgb(56,139,218)",
                        },
                      }}
                    />
                  }
                  label={
                    level[0].substring(0, 1).toUpperCase() +
                    level[0].substring(1)
                  }
                />
              );
            })}
          </RadioGroup>
          <button
            type="submit"
            className="
                bg-black
                text-white
                px-3 
                py-1 
                rounded-full
                "
          >
            Start
          </button>
        </form>
      </div>
    </>
  );
};

export default StartGame;
