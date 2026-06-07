import "./BikePanel.css";

// 주변 따릉이 대여소 정보 전달
function BikePanel({bikeData = []}) {
  return (
    <div className="panel-card">

      {/* 따릉이 패널 헤더 */}
      <div className="bike-header">

        <div>

          {/* 패널 구분 라벨 */}
          <span className="bike-label">
            BIKE
          </span>

          {/* 패널 제목 */}
          <h2 className="bike-title">
            주변 따릉이 대여소
          </h2>

        </div>

          {/* 따릉이 아이콘 */}
          <span className="bike-icon">
            🚲
          </span>

      </div>

      {/* 검색 전 안내 문구 */}
      {bikeData.length === 0 ? (<p>주변 역을 검색하세요.</p>) : (

        // 가까운 따릉이 대여소 5개 표시
        bikeData.slice(0, 5).map((bike, index) => {

          // 자전거 이용률(%)
          const percent = Number(bike.shared);

          return (
            <div className="bike-card" key={bike.stationId}>

              {/* 대여소 순위 및 이름 */}
              <div className="bike-card-top">

                {/* 거리 기준 순위 */}
                <div className="bike-rank">
                  {index + 1}
                </div>

                {/* 대여소 이름 표시 */}
                <h4>
                  {/* 대여소 번호를 표시하지 않음 */}
                  {bike.stationName.replace(/^\d+\.\s*/,"")}
                </h4>

              </div>

              {/* 자전거 이용률 표시 바 */}
              <div className="bike-progress">
                <div className="bike-progress-fill" style={{width: `${percent}%`}}/>
              </div>

              {/* 대여 가능 자전거 수 및 거리 */}
              <div className="bike-bottom">

                {/* 대여 가능 자전거 수 */}
                <span className="bike-count">
                  대여 가능 :{bike.parkingBikeTotCnt}대
                </span>

                {/* 현재 위치 기준 거리 */}
                <span className="bike-distance">
                  📍{bike.distance >= 1000 ? `${(bike.distance /1000).toFixed(1)}km`: `${bike.distance}m`}
                </span>

              </div>

            </div>
          );
        })
      )}
    </div>
  );
}

export default BikePanel;