import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Game from "./Game";
import { GameContext, GameContextProvider } from "../../contexts/GameContext";

describe("Game", () => {
  it("It should render the aria live region", () => {
    const { getByTestId } = render(
      <GameContextProvider>
        <Game />
      </GameContextProvider>
    );
    expect(getByTestId("aria-live")).toBeInTheDocument();
  });

  it("It should render empty aria message when game starts", () => {
    const { getByTestId } = render(
      <GameContext.Provider
        value={{
          gameStatus: "start",
          transitionGame: vi.fn(),
        }}
      >
        <Game />
      </GameContext.Provider>
    );
    expect(getByTestId("aria-live").textContent).toBe("");
  });
});
