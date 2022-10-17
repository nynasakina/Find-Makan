import React from "react";
import { useState, useEffect, createRef } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails.js";

import useStyles from "./styles";

const List = (props) => {
  const classes = useStyles();
  const [type, setType] = useState("restaurants");

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(props.places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [props.places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Makan Near You</Typography>
      {props.loading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          {/* Not working as data doesnot contain Halal details */}
          {/* <FormControl className={classes.formControl}>
            <InputLabel>Halal</InputLabel>
            <Select
              value={props.isHalal}
              onChange={(e) => {
                props.setIsHalal(e.target.value);
              }}
            >
              <MenuItem value="halal">Halal</MenuItem>
            </Select>
          </FormControl> */}

          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={props.rating}
              onChange={(e) => {
                props.setRating(e.target.value);
              }}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={4}> 4 ⭐</MenuItem>
              <MenuItem value={5}> 5 ⭐</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {props.places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(props.childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
