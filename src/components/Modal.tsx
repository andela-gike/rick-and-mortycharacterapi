import React, { FC } from "react";
import OriginInfo from "./Origin";
import EpisodeList from "./Episode";
import Tabs from "./Tabs";
import Tab from "./Tab";

interface ModalProps {
  closeDetails: () => void;
  details: any;
}
const ModalComponent: FC<ModalProps> = ({ details, closeDetails }) => {
  const cleanOriginUrl = (url: string) => {
    return url.length > 0
      ? `location/${url.substring(url.lastIndexOf("/") + 1)}`
      : "";
  };

  return (
    <div className="modal-container">
      <section className="modal-main">
        <button
          className="modal-action-btn"
          onClick={closeDetails}
          type="button"
        >
          x
        </button>
        <header className="modal-header">
          <img
            className="character-img"
            src={details.image}
            alt="character-img"
          />
          <h1>{details.name}</h1>
        </header>
        <div className="row">
          <Tabs>
            <Tab title="Character Details">
              <h1>Gender</h1>
              <span className="value">{details.gender}</span>
              <OriginInfo
                url={cleanOriginUrl(details.origin.url)}
                name={details.origin.name}
              />
              <h1>Location</h1>
              <span className="value">{details.location.name}</span>
            </Tab>
            <Tab title="Episodes">
              <EpisodeList url="episode/" episodeList={details.episodeList} />
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ModalComponent;
