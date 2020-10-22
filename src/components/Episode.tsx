import React, { FC } from "react";
import useFetch from "../customHooks/useFetch";

interface EpisodeProps {
  url: string;
  episodeList: [string];
}

const EpisodeList: FC<EpisodeProps> = ({ url, episodeList }) => {
  const { currentStatus, error, data } = useFetch(url, episodeList);

  return (
    <div className="episode-outerwrap">
      <h1>Episode Details</h1>
      {currentStatus === "fetching" ? (
        <div>Loading</div>
      ) : error && currentStatus === "error" ? (
        <div>There was an error fetching this information</div>
      ) : (
        <ul className="episode-list">
          {currentStatus === "fetched" &&
            data &&
            data.map((epi) => (
              <li key={epi.id}>
                {epi.episode}-{epi.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default EpisodeList;
