import React, { FC } from "react";
import useFetch from "../customHooks/useFetch";

interface OriginProps {
  url: string;
  name: string;
}

type FieldProps = {
  label: string;
  value: string;
};
const TextField = ({ label, value }: FieldProps) => {
  return (
    <div>
      <span className="label">{label}:</span>{" "}
      <span className="value">{value}</span>
    </div>
  );
};
const OriginInfo: FC<OriginProps> = ({ url, name }) => {
  const { currentStatus, error, data } = useFetch(url);
  return (
    <div className="origin-outerwrap">
      <h1 className="title">Origin Information</h1>
      {currentStatus === "fetching" ? (
        <div>Loading</div>
      ) : error && currentStatus === "error" ? (
        <div>There was an error fetching this information</div>
      ) : (
        <div className="origin-wrap">
          <TextField label="Name" value={name} />
          {currentStatus === "fetched" && (
            <>
              <TextField label="Type" value={data.type} />
              <TextField label="Dimension" value={data.dimension} />
              <TextField label="Residents" value={data.residents.length} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OriginInfo;
