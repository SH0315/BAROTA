import "./SubwayPanel.css";

// 수도권 지하철 호선 ID
const subwayLineMap = {
  "1001": "1호선",
  "1002": "2호선",
  "1003": "3호선",
  "1004": "4호선",
  "1005": "5호선",
  "1006": "6호선",
  "1007": "7호선",
  "1008": "8호선",
  "1009": "9호선",
  "1032": "GTX-A",
  "1063": "경의중앙",
  "1065": "공항철도",
  "1067": "경춘선",
  "1075": "수인분당",
  "1077": "신분당선",
  "1081": "경강선",
  "1092": "우이신설",
  "1093": "서해선",
  "1094": "신림선"
};
// 지하철 호선별 색 설정
const lineColors = {
  "1호선": "#0052A4",
  "2호선": "#00A84D",
  "3호선": "#EF7C1C",
  "4호선": "#00A5DE",
  "5호선": "#996CAC",
  "6호선": "#CD7C2F",
  "7호선": "#747F00",
  "8호선": "#E6186C",
  "9호선": "#BDB092",

  "GTX-A" : "#9A6292",
  "신분당선": "#C82127",
  "수인분당": "#F5A200",
  "경의중앙": "#77C4A3",
  "공항철도": "#0090D2",
  "경춘선": "#0C8E72",
  "서해선": "#81A914",
  "신림선" : "#6789CA",
  "경강선" : "#003DA5",
  "우이신설" : " #B0CE18"
};



//열차 방향 정보 함수
const getDirection = (trainLineNm) => {
  if (!trainLineNm) return "";

  const parts = trainLineNm.split("-");

  if (parts.length < 2) {return trainLineNm;}

  return `${parts[0].trim()} (${parts[1].trim()})`;
};




function SubwayPanel({ subwayData, selectedLine, setSelectedLine }) {

const lineList = [...new Set(subwayData.map((train) =>subwayLineMap[train.subwayId]))];

  return (
    // 지하철 도착 정보 부분
    <div className="panel-card">
          
          <div className="panel-header">
                <div>
                  <span className="panel-label">SUBWAY</span>
                  <h2 className="panel-title">실시간 열차 운행 정보</h2>
                </div>
                <span className="panel-icon">🚇</span>
          </div>
          
          {/* //호선 구분 */}
          <div className="line-filter">
          
          {/* 전체버튼 */}
          <button className={`line-btn ${ selectedLine === "전체" ? "active" : "" }`} style={{backgroundColor: "#2c3e50"}} onClick={() =>setSelectedLine("전체")}>
            전체
          </button>
      
          {/* 호선 버튼 */}
          {lineList.map((line) => (<button key={line} className={`line-btn ${selectedLine === line ? "active" : "" }`} 
              style={{ backgroundColor:lineColors[line] || "#666" }}
              onClick={() => setSelectedLine(line)}>
              {line}
          </button>
))}
    </div>
      {/* 출력 담당 */}
      {subwayData.length === 0 ? ( <p>역 이름을 입력하세요.</p>) : 
      ( subwayData
        // 호선 구분
        .filter((train) => selectedLine === "전체" || subwayLineMap[train.subwayId] === selectedLine)
        
        // 도착 순서대로 정렬
        .sort((a,b)=>Number(a.barvlDt) - Number(b.barvlDt))
        
        // 도착 정보 순서대로 띄우기
        .map((train, index) => (
          <div key={index} className="subway-card">
              
              <div className="line-badge" style={{backgroundColor:lineColors[subwayLineMap[train.subwayId]] || "#666",}}>
                {subwayLineMap[train.subwayId]}
              </div>

               <div className="subway-info">
                  {/* 어떤 호선인지 표시*/}
                  <h4>{train.statnNm}</h4>
                  
                  {/* 어느 방면인지 표시 */}
                  <p>{getDirection(train.trainLineNm)}</p>
                  
                  {/* // 일반 열차인지 급행인지 구분 */}
                  <span className={`train-type ${ train.btrainSttus === "급행" ? "express" : "normal"}`}>
                    {train.btrainSttus}
                  </span>
                  
                  {/* //[2]번째 전역 -> 2번째 전역 (대괄호 제거용)*/}
                  <strong>  
                    {train.arvlMsg2.replace(/\[(\d+)\]/, "$1")}
                  </strong>
                </div>

          </div>
              
      ))
      )}
    </div>
  );
}

export default SubwayPanel;