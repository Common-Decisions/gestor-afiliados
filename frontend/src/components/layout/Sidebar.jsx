import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside className="sidebar d-flex flex-column p-3 p-lg-4">
      <div className="brand-mark mb-4">
        <p className="small text-uppercase brand-caption mb-1">Affiliate Manager</p>
        <h4 className="mb-0">Control Center</h4>
      </div>

      <nav className="nav flex-column gap-2 mb-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          Dashboard
        </NavLink>
      </nav>

      <div className="theme-switch mb-4">
        <div className="small text-body-secondary mb-2">Theme</div>
        <button type="button" className="btn btn-theme-toggle w-100" onClick={toggleTheme}>
          {isDark ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>

      <div className="mt-auto pt-4 border-top border-secondary-subtle">
        <div className="small text-body-secondary mb-2">Signed in</div>
        <div className="fw-semibold text-truncate">{user?.name || user?.email}</div>
        <button type="button" className="btn btn-outline-danger btn-sm mt-3 w-100" onClick={logout}>
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
