import { describe, expect, it, vi } from "vitest";
import {
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import Grid from "./Grid";
import { ArtContextProvider } from "../../contexts/ArtContext";
import useRandomArt from "../../hooks/useRandomArt";
import { act } from "react-dom/test-utils";
import { LevelContext } from "../../contexts/LevelContext";
import { GameContext } from "../../contexts/GameContext";
import uniqid from 'uniqid';

describe("Grid", () => {
  const { result: art } = renderHook(() => useRandomArt());
  const fetchSpy = vi.spyOn(global, "fetch");
  vi.mock("../../utils/createDeck");

  beforeAll(() => {
    fetchSpy.mockImplementationOnce(() => Promise.reject());
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("When fetch fails fallback data should be used", () => {
    expect(art.current.data[0].id).toBe(
      "a38e2828-ec6f-ece1-a30f-70243449197b"
    );
  });

  it("Should display the correct number of cards", async () => {
    const createDeck = await import("../../utils/createDeck");
    const cards = art.current.data.map((el) => {
      return {
        id: el.title,
        key: uniqid(),
        img: "",
      };
    });
    createDeck.default = vi.fn().mockResolvedValue(cards);

    // act ensures that async updates (state changes, useEffects) are flushed before making assertions
    await act(async () => {
      render(
        <GameContext.Provider
          value={{
            gameStatus: "loading",
            transitionGame: vi.fn(),
          }}
        >
          <LevelContext.Provider
            value={{
              gridSize: 4,
              difficulty: "easy",
              setLevel: vi.fn(),
              timeElapsed: 0,
              setTimeElapsed: vi.fn(),
              newRecord: false,
            }}
          >
            <ArtContextProvider>
              <Grid score={0} setScore={vi.fn()} isPaused={false} />
            </ArtContextProvider>
          </LevelContext.Provider>
        </GameContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("button")).toHaveLength(16);
    });
    // screen.debug();
  });
});
