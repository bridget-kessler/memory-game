import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Game from "./Game";
import { GameContext } from "../../contexts/gameContext";

describe("Game", () => {
  // const mockGameContext = vi.spyOn(React, "useContext");

  // beforeEach(() => {
  //     mockGameContext.mockReturnValue({
  //         gameStatus: "start"
  //     })
  // })

  it("It should render the an aria live region", () => {
    const { getByTestId } = render(<Game />);
    expect(getByTestId("aria-live")).toBeInTheDocument();
  });

  it("It should render empty aria message when game starts", () => {
    const { getByTestId } = render(
      <GameContext.Provider
        value={{
          gameStatus: "start",
          transitionGame: vi.fn(),
          bestTime: {
            easy: Infinity,
            medium: Infinity,
            hard: Infinity
          },
          setBestTime: vi.fn(),
        }}
      >
        <Game />
      </GameContext.Provider>
    );
    expect(getByTestId("aria-live").textContent).toBe("");
  });
});
