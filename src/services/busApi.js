export const getNearbyBusStations = async () => {
  return [
    {
      stationId: 1,
      stationName: "왕십리역 4번 출구",
      busNo: "4211",
      busType: "지선",
      arrivalTime: "13분 후"
    },
    {
      stationId: 2,
      stationName: "왕십리역 7번 출구",
      busNo: "성동08",
      busType: "마을",
      arrivalTime: "2분 후"
    },
    {
      stationId: 3,
      stationName: "왕십리역",
      busNo: "6010",
      busType: "공항",
      arrivalTime: "39분 후"
    },
    {
      stationId: 4,
      stationName: "성동구청",
      busNo: "145",
      busType: "간선",
      arrivalTime: "9분 후"
    }
  ];
};