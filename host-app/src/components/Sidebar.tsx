import React, { useEffect, useState } from "react";
import { FaAngular, FaReact, FaVuejs } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
type NavigationId = "/" | "/react" | "/vue" | "/angular";
const navigationItems = [
  {
    id: "home" as NavigationId,
    label: "Home",
    icon: MdHome,
    path: "/",
  },
  {
    id: "react" as NavigationId,
    label: "React",
    icon: FaReact,
    path: "/react",
  },
  {
    id: "vue" as NavigationId,
    label: "Vue",
    icon: FaVuejs,
    path: "/vue",
  },
  {
    id: "angular" as NavigationId,
    label: "Angular",
    icon: FaAngular,
    path: "/angular",
  },
];

const Sidebar: React.FC = () => {
  const pathname = useLocation().pathname;
  const [activeView, setActiveView] = useState<NavigationId>("/");

  useEffect(() => {
    setActiveView(pathname as NavigationId);
  }, [pathname]);

  return (
    <aside className='sidebar'>
      <h2 className='sidebar-title'>MicroPanel</h2>
      <ul className='nav-links'>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={activeView === item.path ? "active" : ""}
                onClick={() => setActiveView(item.path as NavigationId)}
              >
                <IconComponent className='icon' />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
