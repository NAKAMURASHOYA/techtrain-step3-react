import { threadsSchema } from "../schemas/ThreadsSchema";
import { PostsSchema } from "../schemas/PostsSchema"; 

export async function fetchThreads() {
  const res = await fetch("https://railway.bulletinboard.techtrain.dev/threads");
  const data = await res.json();
  return threadsSchema.parse(data);
}

export async function createThread(title) {
  const res = await fetch("https://railway.bulletinboard.techtrain.dev/threads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("スレッド作成失敗");
  return await res.json();
}

export async function fetchPosts(threadId) {
  const res = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`);
  const data = await res.json();
  // バリデーション（もし仕様と合わない場合は一旦 return data; だけでもOK）
  return PostsSchema.parse(data); 
}

export async function createPost(threadId, post) {
  const res = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post }), // API仕様に合わせてキー名は要確認（'post' or 'content'など）
  });
  
  if (!res.ok) throw new Error("投稿に失敗しました");
  return await res.json();
}