import { useContext } from "react";
import SlideIn from "./SlideIn";
import { RiErrorWarningFill } from "react-icons/ri";
import { useErrorBoundary } from "react-error-boundary";

const ErrorMsg = ({ error, resetErrorBoundary }) => {

  return (
    <div className="min-h-screen grid overflow-clip">
      <SlideIn>
        <div className="w-fit max-w-sm mx-auto w-fit-content flex flex-col justify-center min-h-full">
          <div role="alert">
            <h1 className="flex items-center gap-x-2"><RiErrorWarningFill />Error</h1>
            <p>Something went wrong. Please wait a moment and try again later.</p>
            <button
              className="
                bg-black
                text-white
                px-3 
                py-1 
                rounded-full
                mt-5
                "
                onClick={resetErrorBoundary}
            >
              Reload
            </button>
          </div>
        </div>
      </SlideIn>
    </div>
  );
};

export default ErrorMsg;
