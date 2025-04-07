import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { todos } from "@/app/db/schema";
import { z } from "zod";

// バリデーションスキーマ: 新規Todo作成用
const createTodoSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
});

export async function GET() {
  const allTodos = await db.select().from(todos);
  return NextResponse.json(allTodos);
}

export async function POST(request: Request) {
  console.log("POST request received");
  try {
    const body = await request.json();
    // Zodでバリデーション
    const parsed = createTodoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { title } = parsed.data;
    const newTodo = await db
      .insert(todos)
      .values({ title, completed: false })
      .returning();

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
