import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css';

function App() {
  const [threads, setThreads] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // API取得
  useEffect(() => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads")
      .then(res => res.json())
      .then(data => setThreads(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* ヘッダー */}
      <header className="app-header">
        <div className="app-title">掲示板アプリ</div>
                <div className="thread-create-button-area">
          <Link to="/threads/new" className="thread-create-button">
          新規作成
          </Link>
        </div>
        
        {/* ハンバーガーアイコン */}
        <div 
          className={`menu-icon ${menuOpen ? "active" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* メインエリア */}
      <main>
        <h1 className="main-title">New Threads</h1>
        
        {/* スレッド一覧 */}
        <ul className="thread-list">
          {threads.map(thread => (
            <li className="thread-item" key={thread.id}>
              <div className="thread-title">{thread.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;