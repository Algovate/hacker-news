import React from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, Clock, Star, PlayCircle, Briefcase, BarChart2 } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { id: 'top', label: 'Top Stories', icon: TrendingUp },
  { id: 'new', label: 'Newest', icon: Clock },
  { id: 'best', label: 'Best', icon: Star },
  { id: 'show', label: 'Show HN', icon: PlayCircle },
  { id: 'job', label: 'Jobs', icon: Briefcase },
];

export default function Sidebar() {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo-icon">Y</span>
        </div>
        <h1 className="heading-display">Hacker News</h1>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <p className="nav-section-title">Feeds</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="nav-section">
          <p className="nav-section-title">Analytics</p>
          <NavLink
            to="/stats"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <BarChart2 size={18} />
            <span>Statistics</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
