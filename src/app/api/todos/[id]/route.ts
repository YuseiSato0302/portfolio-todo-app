import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { todos } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// バリデーションスキーマ: Todo更新用
const updateTodoSchema = z.object({
  title: z.string().min(1, "タイトルは必須ですが、更新時は省略可").optional(),
  completed: z.boolean().optional(),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    // Zodでバリデーション
    const parsed = updateTodoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await db
      .update(todos)
      .set(parsed.data)
      .where(eq(todos.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const deleted = await db.delete(todos).where(eq(todos.id, id)).returning();
    return NextResponse.json(deleted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
