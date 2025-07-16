import "./Sidebar.css";
import { SidebarMenu } from "../../utils/utils";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      />
      <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-container">
          <div className="sidebar-logo">
            <svg
              className="logo-siPedu"
              width={250}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 300 200"
              fill="none"
            >
              <rect
                x={75}
                y={75}
                width={50}
                height={50}
                rx={10}
                ry={10}
                fill="#018c79"
              />
              <path
                d="M100 80 C110 90 110 110 100 120 C90 110 90 90 100 80 Z"
                fill="#ffffff"
              />
              <line
                x1={97}
                y1={85}
                x2={103}
                y2={115}
                stroke="#018c79"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <text
                x={138}
                y={108}
                fontFamily="Arial, sans-serif"
                fontSize={27}
                fill="#018c79"
                fontWeight="bold"
                style={{ letterSpacing: "1.2px" }}
              >
                siDuk
              </text>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={19}
              height={19}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="close-sidebar icon icon-tabler icons-tabler-outline icon-tabler-x"
              onClick={toggleSidebar}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </div>
          <div className="menu-container">
            <ul className="menu">
              {SidebarMenu.map((val, i) =>
                val.type === "sub-header" ? (
                  <li key={i} className="sub-header">{val.content}</li>
                ) : (
                  <li key={i} className={`sub-menu ${isActive(val.path) ? "active" : ""}`}>
                    <a href={val.path}>
                      <div className="icon-menu">
                        {val.icon}
                      </div>
                      <div className="label-menu">
                        <span>{val.label}</span>
                      </div>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
