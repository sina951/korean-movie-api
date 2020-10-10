import React from "react";
import "./Main.css";
import requests from "./components/requestApi";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";

// THE 2 HOOKS WE USE ARE THE FOLLOWING
// useState allows us to use state within our functional components [items] which is our data from API and [setState] to change items. We name it setItems in our case
// useEffect we use to fire of when components load to make an http request to get the data /img /name /movies etc. A snippet of code that runs based on a specific condition/variable, this is where we use useEffect
const App = () => {
  return (
    <div className="app-container">
      <Nav />
      <Banner />
      <Row
        title="KOREA MOST POPULAR"
        fetchUrl={requests.fetchKoreanPopular} // fetchUrl pulls information from requestApi.js, it send info via props to our row.component, which renders it.
        isLargeRow={true} // When this is true = our row will display a poster instead of thumbnail - poster is bigger :) isLargeRow is a name we just made up be create wiht it!
      />
      
      <Row title="Top Rated" fetchUrl={requests.fetchKoreanTopRated} />
      <Row title="Best Revenue" fetchUrl={requests.fetchByRevenue} />
      <Row
        title="Top Rated Movies Choi Min-sik (För Anders)"
        fetchUrl={requests.fetchChoiMinsik}
      />
      <Row title="US" fetchUrl={requests.fetchTrending}/>
    </div>
  );
};

export default App;
