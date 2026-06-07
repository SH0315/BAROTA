import SubwayPanel from "./SubwayPanel";
import BusPanel from "./BusPanel";
import BikePanel from "./BikePanel";
import "./InfoPanel.css";

function InfoPanel({subwayData,bikeData,busData,selectedTab,setSelectedTab,selectedLine,setSelectedLine,}) {
  return (
    <>
      {/* 교통 정보 탭 메뉴 */}
      <div className="tab-menu">

        {/* 지하철 탭 */}
        <button className={selectedTab === "subway"? "tab-btn active" : "tab-btn"}
          onClick={() =>setSelectedTab("subway")}>
          🚇 지하철
        </button>

        {/* 버스 탭 */}
        <button className={ selectedTab === "bus"? "tab-btn active" : "tab-btn" }
          onClick={() =>setSelectedTab("bus")}>
          🚌 버스
        </button>
        
        {/* 따릉이 탭 */}
        <button className={selectedTab === "bike" ? "tab-btn active" : "tab-btn" }
          onClick={() =>setSelectedTab("bike")}>
          🚲 따릉이
        </button>

        

      </div>

      {/* 지하철 정보 패널 */}
      {selectedTab === "subway" && (
        <SubwayPanel
          subwayData={subwayData}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />
      )}

      {/* 따릉이 정보 패널 */}
      {selectedTab === "bike" && (<BikePanel bikeData={bikeData}/>)}

      {/* 버스 정보 패널 */}
      {selectedTab === "bus" && (<BusPanel busData = {busData}/>)}
    </>
  );
}

export default InfoPanel;