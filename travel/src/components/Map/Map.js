import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
// import Rating from "@material-ui/lab";

import useStyles from "./styles";

const Map = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  console.log(props.places);
  // const coordinates = { lat: 0, lng: 0 };

  return (
    <>
      <h1>Map</h1>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDGnwFkBK3A1ApUlbnffBh6V7o2nlIHlXY" }}
          defaultCenter={props.coordinates}
          center={props.coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          onChange={(e) => {
            console.log(e);
            props.setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            props.setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
        >
          {props.places?.map((places, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(places.latitude)}
              lng={Number(places.longitude)}
              key={i}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {places.name}
                  </Typography>
                  <img
                    alt={places.name}
                    className={classes.pointer}
                    src={
                      places.photo
                        ? places.photo.images.large.url
                        : "https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg"
                    }
                  />
                </Paper>
              )}
            </div>
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
