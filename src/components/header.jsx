import { Link } from "react-router-dom";

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="app-header">
      <Link to="/" className="app-title">掲示板アプリ</Link>
      <div className="header-actions">
        <Link to="/threads/new" className="thread-create-button">新規作成</Link>
        <div
          className={`menu-icon ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default Header;