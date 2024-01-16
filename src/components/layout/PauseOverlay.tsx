import { ReactNode } from "react";
import AriaLiveRegion from "./AriaLiveRegion";

type Props = {
    children: ReactNode,
    isPaused: boolean
}

const PauseOverlay = ({ children, isPaused }: Props) => {
  return (
    <>
      <div
        style={{
          opacity: isPaused ? 0.5 : 1,
        }}
        className="flex overflow-auto"
      >
        <AriaLiveRegion>
          {isPaused ? "Game is paused" : "Game has resumed"}
        </AriaLiveRegion>
        {children}
      </div>
    </>
  );
};
export default PauseOverlay;
