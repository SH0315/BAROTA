import axios from "axios";

//환경 변수에 저장된 지하철 API 키
const API_KEY =  import.meta.env.VITE_SUBWAY_API_KEY;

export const getSubwayArrival = async (
  stationName
) => {
  const response = await axios.get(
    `http://swopenapi.seoul.go.kr/api/subway/${API_KEY}/json/realtimeStationArrival/0/10/${stationName}`
  );

  

  return response.data.realtimeArrivalList || [];
};