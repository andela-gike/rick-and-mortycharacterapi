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
const Field = ({ label, value }: FieldProps) => {
  return (
    <div>
      <span className={"label " + label}>{label}</span> <span>{value}</span>
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
          <Field label="origin" value={name} />
          {currentStatus === "fetched" && (
            <>
              <Field label="dimension" value={data.dimension} />
              <Field label="residents" value={data.residents.length} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OriginInfo;
