import * as React from "react";
import "./styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import useFetch from "./customHooks/useFetch";

const App = () => {
  const { currentStatus, data, error } = useFetch<[]>("character");
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
      <Footer />
    </div>
  );
};

export default App;
