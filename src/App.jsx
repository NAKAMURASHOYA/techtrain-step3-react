import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

useEffect(() => {
  fetch("https://railway.bulletinboard.techtrain.dev/threads")
    .then(res => res.json())
    .then(data => setThreads(data))
    .catch(err => setError(err))
}, []);

  return (
    <div>
      <h1>スレッド一覧</h1>
      {error && <div>エラーが発生しました: {error.message}</div>}
      <ul>
        {threads.map(thread => (
          <li className = "thread-item" key={thread.id}>
            {thread.title}
          </li>
          ))}
      </ul>
    </div>
  );
}

export default App
