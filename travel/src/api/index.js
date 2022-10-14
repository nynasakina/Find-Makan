import axios from "axios";

const url =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

const options = {
  method: "GET",
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
  },
  headers: {
    "X-RapidAPI-Key": "eeb8cdfba7mshe27b88cf64e2accp1ccb08jsn6680000eadd7",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

export const getPlaceData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(url, options);

    return data
  } catch (error) {
      console.log(error);
  }
};
