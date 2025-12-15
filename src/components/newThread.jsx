import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createThread } from "../api/threads";

function NewThread({ onCreated }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await createThread(title);
      setTitle("");
      if (onCreated) onCreated();
      navigate("/");
    } catch {
      setError("作成に失敗しました");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>新規スレッド作成</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        placeholder="スレッドタイトル"
      />
      <button type="submit">作成</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
export default NewThread;