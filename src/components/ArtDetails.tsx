import { useContext, useEffect, useRef } from "react";
import { ArtContext } from "../contexts/artContext";
import { capitalize } from "@mui/material";
import useLQIP from "../hooks/useLQIP";

type Props = {
  selectedArtId: string | null;
};

const ArtDetails = ({ selectedArtId }: Props) => {
  const { art,  } = useContext(ArtContext);
  const selectedArt = art?.filter((el) => el.title === selectedArtId)[0];
  const { src, isBlurred } = useLQIP(
    selectedArt?.img_url,
    selectedArt?.lqip,
    748,
    selectedArt?.aspect_ratio
  );

  if (selectedArt) {
    return (
      <div>
        <h1 className="mb-5">{selectedArt.title}</h1>
        <figure
          className="overflow-hidden pb-10"
          style={{
            aspectRatio: selectedArt.aspect_ratio,
          }}
        >
          <img
            className="rounded-sm object-cover h-full w-full"
            crossOrigin="anonymous"
            width={"748px"}
            height={"100%"}
            src={src}
            style={{
              transform: isBlurred ? "scale(1.3)" : "",
              filter: isBlurred ? "blur(18px)" : "",
            }}
            alt={selectedArt.alt_text}
          />
        </figure>
        <>
          {Object.entries(selectedArt)
            .filter((el) =>
              ["title", "artist", "date", "medium", "place_of_origin"].includes(
                el[0]
              )
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
      </div>
    );
  }
};

export default ArtDetails;
