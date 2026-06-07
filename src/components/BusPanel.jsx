import "./BusPanel.css";

// 버스 종류별 색상 설정
const busTypeColor = {
  간선: "#0068b7",
  지선: "#53b332",
  마을: "#53b332",
  광역: "#e60012",
  공항: "#00a0e9",
};

// 버스 정보 데이터 전달
function BusPanel({ busData = []}) {
  return (
    <div className="panel-card">

      {/* 버스 패널 헤더 */}
      <div className="panel-header">

        <div>
          {/* 패널 구분 라벨 */}
          <span className="panel-label">BUS</span>

          {/* 패널 제목 */}
          <h2 className="panel-title">주변 버스 정보</h2>
        </div>

        {/* 버스 아이콘 */}
        <span className="panel-icon">🚌</span>
      </div>

      {/* 버스 정보가 없을 경우 */}
      {busData.length === 0 ? ( <p>주변 역을 검색하세요.</p>) : (

        // 버스 정보 카드 출력
        busData.map((bus) => (

          <div className="bus-card" key={bus.stationId}>

            <div className="bus-info">

              {/* 버스 종류 및 번호 */}
              <div className="bus-top">

                {/* 버스 종류 배지 */}
                <span className="bus-type" style={{backgroundColor: busTypeColor[bus.busType]}}>
                  {bus.busType}
                </span>

                {/* 버스 번호 */}
                <h4>
                  {bus.busNo}번
                </h4>

              </div>

              {/* 정류장 이름 */}
              <p>
                {bus.stationName}
              </p>

              {/* 도착 예정 시간 */}
              <strong>
                {bus.arrivalTime}
              </strong>

            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default BusPanel;