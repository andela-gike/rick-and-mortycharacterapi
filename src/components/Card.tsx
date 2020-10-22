import React, { FC, useState } from "react";
import Modal from "./Modal";
import { IDetails } from "../types";

interface CardProps extends IDetails {}
const CardComponent: FC<CardProps> = ({
  image,
  name,
  status,
  species,
  location,
  origin,
  id,
  gender,
  episode
}) => {
  const [details, setDetails] = useState<CardProps | {}>({});
  const getEpisodeString = () => {
    let episodeArray =
      episode &&
      episode.map((epiString: string) => {
        return epiString.substring(epiString.lastIndexOf("/") + 1);
      });
    return episodeArray;
  };
  const openDetails = (id: number) => {
    setDetails({
      image,
      name,
      status,
      species,
      location,
      origin,
      gender,
      id,
      episodeList: getEpisodeString()
    });
  };

  const closeDetails = () => {
    setDetails({});
  };
  return (
    <>
      <div className="card-container">
        <div className="image">
          <img src={image} alt="character-img" />
        </div>
        <div className="content">
          <a className="header" href="/">
            {name}
          </a>
          <div className="meta">
            <span className="status">
              <span
                className={`live-status ${
                  status === "Alive" ? "alive" : "dead"
                }`}
              ></span>
              {status} - {species}
            </span>
          </div>
        </div>
        <div className="extra content">
          <button
            className="view-more-btn"
            type="button"
            onClick={() => openDetails(id)}
          >
            Learn more
          </button>
        </div>
      </div>
      {details && Object.keys(details).length > 0 && (
        <Modal details={details} closeDetails={closeDetails} />
      )}
    </>
  );
};

export default CardComponent;
