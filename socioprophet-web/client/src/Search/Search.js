import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import Footer from "../components/landing/landing_components/Footer";

// styles
import "./styles/search.css";

const Temp = () => {
  const location = useLocation();

  const query = location.state.data;

  const API_KEY = "AIzaSyDeZueSUiuOAgQuDOBAF5QWvFce_fjkMMc";

  const API_URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=017576662512468239146:omuauf_lfve&q=${query}`;

  const GetSearchData = () => {
    const [data, setData] = useState("");

    useEffect(() => {
      const getSearchResults = async () => {
        try {
          const response = await axios(API_URL);
          console.log(response.data.items);

          const items = Array.from(response.data.items).map((item) => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
          }));

          setData(items);

          console.log("fetch successful!");
          console.log(location.state.data);
        } catch (err) {
          console.log("an error is hererer");
          console.error(err);
        }
      };
      getSearchResults();
    }, [location]);

    return data ? (
      <p
        style={{
          position: "relative",
          display: "grid",
          color: "purple",
          overflow: "scroll",
        }}
      >
        {data.map((items) => (
          <span style={{ marginTop: "40px", marginLeft: "25px" }}>
            <a href={items.link}>
              <strong>
                <span>{items.title}</span>
              </strong>
            </a>
            <p>{items.snippet}</p>
          </span>
        ))}
      </p>
    ) : (
      <p className="loading">Loading...</p>
    );
  };

  return (
    <>
      <div className="container"></div>
      <div className="search">
        <Link className="search__home" to="/">
          SocioProphet Home
        </Link>
        <h3 className="search__heading">
          Showing results for "
          <span style={{ color: "#000" }}>{location.state.data}</span>"
        </h3>

        <div>
          <GetSearchData />
          <Footer />
        </div>
      </div>
      <div className="container__footer"></div>
    </>
  );
};

export default Temp;
