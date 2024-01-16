import { useContext, useEffect, useRef } from "react";
import { ArtContext } from "../contexts/artContext";
import { capitalize } from "@mui/material";
import useLQIP from "../hooks/useLQIP";

type Props = {
  selectedArtId: string | null;
};

const ArtDetails = ({ selectedArtId }: Props) => {
  const { art, category } = useContext(ArtContext);
  const ref = useRef<HTMLDivElement>(null);
  const selectedArt = art?.filter((el) => el.title === selectedArtId)[0];
  const { src, isBlurred } = useLQIP(
    selectedArt?.img_url,
    selectedArt?.lqip,
    748,
    selectedArt?.aspect_ratio
  );

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  if (selectedArt) {
    return (
      <div className="" ref={ref} tabIndex={-1}>
        <>
          <h1 className="mb-5">{selectedArt.title}</h1>
          <figure className="overflow-hidden pb-10">
            <img
              className="rounded-sm object-contain object-left h-auto w-full"
              crossOrigin="anonymous"
              width={"748px"}
              height={
                selectedArt.aspect_ratio
                  ? `${748 / selectedArt.aspect_ratio}px`
                  : "auto"
              }
              src={src}
              style={{
                aspectRatio: selectedArt.aspect_ratio,
                transform: isBlurred ? "scale(1.3)" : "",
                filter: isBlurred ? "blur(15px)" : "",
              }}
              alt={selectedArt.alt_text}
            />
          </figure>
          <>
            {Object.entries(selectedArt)
              .filter((el) =>
                [
                  "title",
                  "artist",
                  "date",
                  "medium",
                  "place_of_origin",
                ].includes(el[0])
              )
              .map((item, i) => {
                return (
                  // white-space pre-line treats white space as a new line
                  <p
                    key={i}
                    className="py-2 last:border-b-0 border-b border-black whitespace-pre-line"
                  >
                    <span className="text-neutral-500">
                      {capitalize(item[0].replaceAll("_", " "))}:{" "}
                    </span>
                    {item[1]}
                  </p>
                );
              })}
          </>
        </>
      </div>
    );
  }
};

export default ArtDetails;
