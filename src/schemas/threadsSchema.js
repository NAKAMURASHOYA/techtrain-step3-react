import { z } from "zod";

export const threadSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const threadsSchema = z.array(threadSchema);

// **zod（ゾッド）**は「取得したデータの構造・型をバリデーション（検証）する」ためのライブラリ。
// 例えば「スレッド一覧APIから来たJSONが本当に{id:number, title:string}の配列か？」をzodスキーマで定義し、.parse()でチェックする処理です。
// JSONの形や型が合っていない場合は、エラーで弾いて安全にできます。