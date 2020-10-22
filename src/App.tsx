import React, { useState } from "react";
import "./styles.scss";
import Header from "./components/Header";
import Card from "./components/Card";
import useFetch from "./customHooks/useFetch";
import Pagination from "./components/Pagination";

const App = () => {
  const [goToPage, setGoToPage] = useState("");
  const { currentStatus, data, error } = useFetch<[]>(`character/${goToPage}`);
  const onPageChanged = (dataList: any) => {
    console.log("called", goToPage);
    const { currentPage } = dataList;
    setGoToPage(`?page=${currentPage}`);
  };
  return (
    <div className="App">
      <Header />
      <section className="card-list-display">
        {error && currentStatus === "error" ? (
          <div>There was an error fetching this information</div>
        ) : currentStatus === "fetched" ? (
          data.results.map((result) => <Card key={result.id} {...result} />)
        ) : (
          <div>Loading</div>
        )}
      </section>
      {currentStatus === "fetched" && (
        <Pagination
          onPageChanged={onPageChanged}
          totalRecords={data.info.count}
          pageLimit={20}
          pageNeighbours={1}
          totalPages={data.info.pages}
        />
      )}
    </div>
  );
};

export default App;
