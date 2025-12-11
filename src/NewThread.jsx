import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NewThread() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("https://railway.bulletinboard.techtrain.dev/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setLoading(false);
    navigate("/"); // 登録成功後、一覧へ戻る
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>新規スレッド作成</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="スレッドタイトル"
        required
      />
      <button type="submit" disabled={loading || !title}>
        作成
      </button>
    </form>
  );
}
export default NewThread;