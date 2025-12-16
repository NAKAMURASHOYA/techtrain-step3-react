import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { fetchThreads } from "./api/Threads";
import ThreadList from "./components/ThreadList";
import NewThread from "./components/NewThread";
import Header from "./components/Header";
import PostList from "./components/PostList";


function App() {
  const [threads, setThreads] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // スレッド一覧再取得
  const refreshThreads = async () => {
    try {
      const data = await fetchThreads();
      setThreads(data);
    } catch (e) {
      console.error("スレッド取得失敗", e);
      setThreads([]);
    }
  };
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchThreads();
        setThreads(data);
      } catch (e) {
        console.error("初回スレッド取得失敗", e);
        setThreads([]);
      }
    };
    
    loadData();
  }, []);
  
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
          <Route path="/threads/:thread_id" element={<PostList />} />
          </Routes>
      </main>
    </div>
  );
}
export default App;