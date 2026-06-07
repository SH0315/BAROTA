import "./Header.css";
import {Search, MapPin, RefreshCw} from "lucide-react";
import logo from "../assets/logo.png";

// 검색어 및 버튼 이벤트 함수 전달
function Header({search, setSearch, onLocationClick, onRefresh, onSearch, refreshStatus}) {
  return (
    <header className="header">

      {/* 로고 및 서비스 소개 영역 */}
      <div className="header-left">

        {/* 서비스 로고 */}
        <div className="logo">
          <img src={logo} alt="Metro Move Board" className="logo-image"/>
        </div>

        {/* 서비스 이름 및 설명 */}
        <div>
          <h1>바로 타</h1>
          <p>지하철과 버스에서 자전거까지,끊김 없는 이동의 시작</p>
        </div>

      </div>

      {/* 검색 및 기능 버튼 영역 */}
      <div className="header-right">

        {/* 역 검색 입력창 */}
        <div className="search-box">

          {/* 검색 아이콘 */}
          <Search size={18} />

          <input type="text" placeholder="역 이름 검색" value={search}

            // 검색어 입력 시 상태 업데이트
            onChange={(e) =>setSearch(e.target.value)}

            // Enter 입력 시 검색 실행
            onKeyDown={(e) => {if (e.key === "Enter") {onSearch(search);}}}
          />

        </div>

        {/* 현재 위치 조회 버튼 */}
        <button className="location-btn"onClick={onLocationClick}>
          <MapPin size={18} /> 
          현재 위치
        </button>

        {/* 정보 새로고침 버튼 */}
            <button className="refresh-btn" onClick={onRefresh}>
                {/* 새로고침 완료 시 체크 아이콘 표시 */}
                {refreshStatus === "success" ? ( <span>✅</span>) : (
                  /* 기본 상태 또는 갱신 중일 때 새로고침 아이콘 표시 */
                  <RefreshCw size={18}
                    /* 갱신 중이면 회전 애니메이션 적용 */
                    className={ refreshStatus === "loading" ? "spin": ""}/>
                )}

                {/* 새로고침 상태에 따라 버튼 텍스트 변경 */}
                {refreshStatus === "loading" ? "갱신중..." : refreshStatus === "success" ? "정보 갱신!": "새로고침"}
             </button>
       
      </div>

    </header>
  );
}

export default Header;