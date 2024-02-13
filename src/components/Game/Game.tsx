import { ReactNode, useEffect, useState } from "react";
import StartGame from "../StartGame";
import { useContext } from "react";
import { GameContext } from "../../contexts/gameContext";
import LoadingScreen from "../LoadingScreen";
import SlideIn from "../layout/SlideIn";
import GameBoard from "../Gameboard";
import GameOver from "../GameOver";
import AriaLiveRegion from "../layout/AriaLiveRegion";

const Game = () => {
  const { gameStatus } = useContext(GameContext);


  const message = () => {
      switch(gameStatus) {
          case "loading":
              return (
                  <>Game is loading</>
              );
          case "active":
              return (
                  <>Game started. Flip over each card to discover their hidden values. Find all the matching pairs of cards to win.</>
              );
          case "over":
              return (
                  <>Gameover</>
              );
          default:
              return "";
      }
  }

  const gameScreen = (): ReactNode  => {
    switch(gameStatus) {
      case 'loading':
          return (
          <SlideIn>
             <LoadingScreen />
          </SlideIn>
        );
      case 'active': 
          return (
            <SlideIn>
              <GameBoard />
            </SlideIn>
          );
      case 'over':
        return (
          <SlideIn>
            <GameOver />
          </SlideIn>
        );
      default:
        return (
          <SlideIn>
            <StartGame />
          </SlideIn>
        );
    }
  }

  return (
  <main className="min-h-screen grid bg-stone overflow-clip">
    <AriaLiveRegion>{message()}</AriaLiveRegion>
    {gameScreen()}
  </main>
  )
}

export default Game;
