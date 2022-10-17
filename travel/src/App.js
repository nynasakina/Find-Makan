import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlaceData } from "./api/index.js";

import Header from "./components/Header/Header.js";
import List from "./components/List/List.js";
import Map from "./components/Map/Map.js";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ sw: 0, ne: 0 });
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isHalal, setIsHalal] = useState("");
  const [filteredHalal, setFilteredHalal] = useState([]);

  // getting current location of user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlace = places.filter((place) => place.rating == rating);
    setFilteredPlaces(filteredPlace);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setLoading(true);
      getPlaceData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [coordinates, bounds]);

  return (
    <div>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            rating={rating}
            setRating={setRating}
            isHalal={isHalal}
            setIsHalal={setIsHalal}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
