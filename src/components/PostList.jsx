import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPosts, createPost } from "../api/Threads"; // createPostを追加インポート

function PostList() {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(""); // フォーム用state
  const [loading, setLoading] = useState(true);

  // データ取得関数（再利用するため外に出す）
  // useCallbackでloadPostsをメモ化し、依存配列にthread_idを入れることでthread_idが変化した際にのみ新しい関数インスタンスを作成し、
  // 正しく再実行されます。
  const loadPosts = useCallback(async () => {
    try {
      const data = await fetchPosts(thread_id);
      setPosts(data.posts);
    } catch (error) {
      console.error("取得エラー", error);
    } finally {
      setLoading(false);
    }
  }, [thread_id]); // ← 必ず依存に thread_id を含める

  // 初回マウント時
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // ↑「メモ化済みコールバックの適切な依存」で、将来的なリファクタにも強いコードに

  // 投稿送信ハンドラ
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      // 1. 投稿APIを叩く
      await createPost(thread_id, newPost);
      
      // 2. フォームをクリア
      setNewPost("");
      
      // 3. ★重要★ 投稿一覧をサーバーから再取得して更新（即時反映）
      await loadPosts(); 
      
    } catch (error) {
      console.error("投稿エラー", error);
      alert("投稿に失敗しました");
    }
  };

  // ローディング中…ちょっと気になる
  if (loading)
    return <div>読み込み中...</div>;
  
  return (
    <div className="post-list-container">
      <h2>スレッド内の投稿一覧</h2>
      
      {/* 投稿一覧 */}
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            {post.post}
          </li>
        ))}
      </ul>

      {/* 投稿フォームエリア（下部に追加） */}
      <div className="post-form-area">
        <form onSubmit={handleSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="投稿内容を入力してください"
            rows={3}
            required
          />
          <button type="submit">投稿する</button>
        </form>
      </div>
    </div>
  );
}

export default PostList;