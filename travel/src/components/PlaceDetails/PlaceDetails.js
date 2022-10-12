import React from "react";

const PlaceDetails = (props) => {
  console.log(props);
  return <div>{props.place.name}</div>;
};

export default PlaceDetails;
