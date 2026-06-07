import axios from "axios";

//환경 변수에 저장된 따릉이 API 키
const API_KEY =  import.meta.env.VITE_BIKE_API_KEY;

export const getBikeStations = async () => {
  const response = await axios.get(
    `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/1/1000`
  );

  return response.data.rentBikeStatus.row || [];
};