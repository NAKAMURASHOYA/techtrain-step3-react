import { useEffect, useState } from 'react';
import { Link, Routes, Route ,useLocation } from "react-router-dom";
import './App.css';
import NewThread from './NewThread';

function App() {
  const [threads, setThreads] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // API取得
  useEffect(() => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads")
      .then(res => res.json())
      .then(data => setThreads(data))
      .catch(err => console.error(err));
  }, [location.pathname]);

  return (
    <div>
      {/* ヘッダー */}
      <header className="app-header">
        <Link to="/" className="app-title">掲示板アプリ</Link>
        <div className="header-actions">
          <Link to="/threads/new" className="thread-create-button">
          新規作成
          </Link>
        
        {/* ハンバーガーアイコン */}
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

      {/* メインエリア */}
      <main>
        <Routes>
          <Route 
            path="/"
            element={
              <>
                <h1 className="main-title">New Threads</h1>
        
        {/* スレッド一覧 */}
        <ul className="thread-list">
          {threads.map(thread => (
            <li className="thread-item" key={thread.id}>
              <div className="thread-title">{thread.title}</div>
            </li>
          ))}
        </ul>
        </>
        }
        />
        <Route path="threads/new" element={<NewThread />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;