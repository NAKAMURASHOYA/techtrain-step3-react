import { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { fetchThreads } from "./api/threads";
import ThreadList from "./components/threadList";
import NewThread from "./components/newThread";

function App() {
  const [threads, setThreads] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // スレッド一覧再取得
  async function refreshThreads() {
    try {
      const data = await fetchThreads();
      setThreads(data);
    } catch (e) {
      console.error("スレッド取得失敗", e);
      setThreads(["エラーです"]); // またはエラーメッセージ
    }
  }

  useEffect(() => {
    const loadThreads = async () => {
      await refreshThreads();
    };
    loadThreads();
  }, [location.pathname]);

  return (
    <div>
      <header className="app-header">
        <Link to="/" className="app-title">掲示板アプリ</Link>
        <div className="header-actions">
          <Link to="/threads/new" className="thread-create-button">新規作成</Link>
          <div className={`menu-icon ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/"
            element={
              <>
                <h1 className="main-title">New Threads</h1>
                <ThreadList threads={threads} />
              </>
            }
          />
          <Route path="/threads/new"
            element={<NewThread onCreated={refreshThreads} />}
          />
        </Routes>
      </main>
    </div>
  );
}
export default App;