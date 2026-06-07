import { useState } from "react";
import {Map, MapMarker, CustomOverlayMap} from "react-kakao-maps-sdk";
import "./MapSection.css";

function MapSection({ position,setPosition,bikeData,}) {

  // 사용자가 클릭한 따릉이 대여소 정보 저장
  const [selectedBike, setSelectedBike] = useState(null);

  return (
    <Map
      // 지도 중심 좌표
      center={position}

      // 지도 확대 정도
      level={3}

      // 지도 크기 설정
      style={{width: "100%",height: "580px"}}

      // 지도 클릭 시 해당 위치로 중심 좌표 이동
      onClick={(_, mouseEvent) => {
        const latlng = mouseEvent.latLng;
        setPosition({lat: latlng.getLat(), lng: latlng.getLng(),});
      }}
    >

      {/* 현재 검색 위치 마커 */}
      <MapMarker position={position} />

      {/* 따릉이 대여소 위치 표시 */}
      {bikeData.map((bike, index) => (
        <CustomOverlayMap key={bike.stationId} position={{lat: Number(bike.stationLatitude), lng: Number( bike.stationLongitude),}}>
          
          {/* 대여소 순번 마커 */}
          <div className="bike-marker" onClick={() =>setSelectedBike(bike)}>
            {index + 1}
          </div>

        </CustomOverlayMap>
      ))}

      {/* 선택한 따릉이 대여소 정보 표시 */}
      {selectedBike && (
        <CustomOverlayMap position={{
            // 마커와 겹치지 않도록 위쪽에 표시
            lat: Number( selectedBike.stationLatitude) + 0.00025,
            lng: Number( selectedBike.stationLongitude),
          }}>

          <div className="bike-info">
            {/* 정보창 닫기 버튼 */}
            <button className="close-btn" onClick={() => setSelectedBike(null)}> ✕ </button>

            {/* 대여소 이름 */}
            <strong className="bike-title">🚲{" "}{selectedBike.stationName.replace(/^\d+\.\s*/,"")}</strong>

            {/* 대여 가능한 자전거 수 */}
            <p>대여 가능 :{selectedBike.parkingBikeTotCnt}대</p>

            {/* 현재 검색 위치 기준 거리 */}
            <p>거리 : {selectedBike.distance}m</p>

          </div>

        </CustomOverlayMap>
      )}

    </Map>
  );
}

export default MapSection;