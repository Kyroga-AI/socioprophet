import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { LocationHeartFilled16 } from "@carbon/icons-react";

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
          display: "grid",
          color: "purple",
        }}
      >
        {data.map((items) => (
          <div style={{ marginTop: "50px", marginLeft: "15px" }}>
            <a href={items.link}>
              <strong>
                <span style={{ border: "1px solid black" }}>{items.title}</span>
              </strong>
            </a>
          </div>
        ))}
      </p>
    ) : (
      <p styles={{ visibility: "hidden" }}>Loading...</p>
    );
  };

  return (
    <div>
      <h1>Search results for "{location.state.data}"</h1>

      <div>
        <GetSearchData />
      </div>
    </div>
  );
};

export default Temp;
