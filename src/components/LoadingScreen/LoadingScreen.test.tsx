import { describe, expect, it, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import useRandomArt from "../../hooks/useRandomArt";
import { ArtContextProvider } from "../../contexts/ArtContext";
import LoadingScreen from "./LoadingScreen";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMsg from "../layout/ErrorMsg";

describe("Loading Screen", () => {
  const fetchSpy = vi.spyOn(global, "fetch");
  const { result } = renderHook(() => useRandomArt());

  beforeAll(() => {
    fetchSpy.mockImplementationOnce(() => Promise.reject());
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("When fetch fails default category should be used", () => {
    expect(result.current.category.title).toBe("Claude Monet");
  });

  it("When fetch fails default category appear on the page", () => {
    const { getByTestId } = render(
      <ErrorBoundary fallbackRender={ErrorMsg}>
        <ArtContextProvider>
          <LoadingScreen />
        </ArtContextProvider>
      </ErrorBoundary>
    );

    expect(getByTestId("category").textContent).toBe("Category: Claude Monet");
  });
});

// "Claude Monet\nFrench, 1840-1926"
