import { threadsSchema } from "../schemas/threadsSchema";

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