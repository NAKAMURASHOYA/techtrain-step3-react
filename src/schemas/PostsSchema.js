import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  post: z.string(), // API仕様に合わせてフィールド名は確認が必要（例: content, body, textなど）
});

export const PostsSchema = z.object({
  threadId: z.string(),
  posts: z.array(PostSchema),
});