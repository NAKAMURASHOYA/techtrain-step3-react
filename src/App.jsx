import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { fetchThreads } from "./api/threads";
import ThreadList from "./components/threadList";
import NewThread from "./components/newThread";
import Header from "./components/header";

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
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
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