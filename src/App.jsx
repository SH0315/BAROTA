import { useState } from "react";
import Header from "./components/Header";
import MapSection from "./components/MapSection";
import InfoPanel from "./components/InfoPanel";
import { getSubwayArrival } from "./services/subwayApi";
import { getBikeStations } from "./services/bikeApi";
import { getNearbyBusStations } from "./services/busApi";
import "./App.css";

function App() { 
  
  //지도에 표시되는 위치 정보 관리 (lat : 위도 / lng : 경도)
  const [position, setPosition] = useState({lat: 37.4979, lng: 127.0276,});
  
  // 검색 정보 관리
  const [search, setSearch] = useState("");

  //새로고침 상태 관리
  const [refreshStatus, setRefreshStatus] = useState("idle");
  
  // 현재 검색한 역의 위치 관리
  const [currentStation, setCurrentStation] = useState("");

  // 대중교통 탭 관리
  const [selectedTab, setSelectedTab] = useState("subway");

  
  // 지하철 정보 관리
  const [subwayData, setSubwayData] = useState([]);
  
  //버스 정보 관리
  const [busData, setBusData] = useState([]);
  
  // 따릉이 정보 관리
  const [bikeData, setBikeData] = useState([]);

  //지하철 호선 구분 관리
  const [selectedLine, setSelectedLine] = useState("전체");


  
  
 
  

  //가까운 거리의 따릉이 대여소 찾기 위한 함수
 const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;

  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) 
    * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
};
  


  const handleLocation = () => {
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
      
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition({lat, lng});
        // 내 위치 클릭시 내 주변의 역으로 안내
           const ps = new window.kakao.maps.services.Places();
        
      ps.categorySearch(
        "SW8", (data, status) => {
         
            //카카오맵이 제공하는 지도 데이터와 같으면
          if (status === window.kakao.maps.services.Status.OK) {

            const nearestStation = data[0].place_name.split(" ")[0];

            

            handleSearch(nearestStation);
          }},
        {
          location: new window.kakao.maps.LatLng(lat, lng),
         
          // 현재 위치로 부터 가장 가까운 역을 찾는 범위(m)
          radius: 1500
        }
      );


      },
      (err) => {console.error(err);alert("위치 정보를 가져올 수 없습니다.");}
    );
  };

 const handleSearch = async (keyword) => {
  if (!window.kakao) return;

  const ps = new window.kakao.maps.services.Places();

  ps.keywordSearch(keyword, async (data, status) => {
  if (status ===window.kakao.maps.services.Status.OK) {
    
    const place = data[0];
    const currentLat = Number(place.y);
    const currentLng = Number(place.x);
    setCurrentStation(keyword);

    setPosition({ lat: currentLat, lng: currentLng});

    //지하철 정보 받아오기
    const stationName = keyword.replace(/역$/, "");
    const result = await getSubwayArrival(stationName);
  ;
    setSubwayData(result || []);
    setSelectedLine("전체");

    //따릉이 정보 받아오기
    const bikes = await getBikeStations();

    
    // 주변에 가까운 따릉이 정보 가져오기 (5개)
    const nearestBikes = bikes
    .map((bike) => ({...bike, distance: 
      getDistance(currentLat,currentLng,
        Number(bike.stationLatitude),Number(bike.stationLongitude)),
    }))
    //가까운 순으로 분류
    .sort((a, b) => a.distance - b.distance)
    //최대 5개 가져옴
    .slice(0, 5);
    
    
   
    setBikeData(nearestBikes);


    //가까운 버스 정류장 정보 받아오기
    const stations = await getNearbyBusStations();

    setBusData(stations);


      
    
    // 검색한 후에 검색창 비우기
    setSearch("");
  } else {
    alert("검색 결과가 없습니다.");
  }
});
}; 

  return (
    <div className="app">
      <Header
        search={search}
        setSearch={setSearch}
        onLocationClick={handleLocation}
       
        // 새로 고침 상태 관리
        refreshStatus={refreshStatus}
        
        onRefresh={async () => {if(currentStation){handleSearch(currentStation);}
        
        setRefreshStatus("loading");

        await handleSearch(currentStation);
        
        setRefreshStatus("success");

        setTimeout(() => {setRefreshStatus("idle");}, 1500);
      
      }}
       
        onSearch={handleSearch}

      />
      {/* 현재 조회 위치 부분 */}
      <div className="current-location">
        📍 현재 조회 위치 : <strong>{currentStation || " 검색 전"}</strong>
      </div>


       {/* 지도 부분 */}
      <div className="dashboard">
        <MapSection position={position} setPosition={setPosition} bikeData={bikeData}/>

         {/* 정보패널영역 */}
        <div className="info-panel">
          <InfoPanel
            subwayData = {subwayData}
            bikeData = {bikeData}
            busData = {busData}
            selectedTab = {selectedTab}
            setSelectedTab = {setSelectedTab}
            selectedLine = {selectedLine}
            setSelectedLine = {setSelectedLine}
          />
        </div>
      </div>
    </div>
  );
}

export default App;