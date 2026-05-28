import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type TodoRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, ctx: TodoRouteContext) {
  try {
    const { id } = await ctx.params;
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return NextResponse.json({ error: "todo not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, ctx: TodoRouteContext) {
  try {
    const { id } = await ctx.params;
    const { title, description } = await request.json();
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description: description?.trim(),
      },
    });
    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to update todo" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, ctx: TodoRouteContext) {
  try {
    const { id } = await ctx.params;
    const { title, description, completed } = await request.json();

    const existing = await prisma.todo.findUnique({ where: { id }, });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Todo not found" }, { status: 404 });
    }

    const data: { title?: string; description?: string; completed?: boolean } = {};
    if (typeof title === "string") {
      if (!title.trim()) {
        return NextResponse.json({ success: false, error: "Title cannot be empty" }, { status: 400 });
      }
      data.title = title.trim();
    }
    if (typeof description === "string") {
      data.description = description.trim();
    }
    if (typeof completed === "boolean") {
      data.completed = completed;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: false, error: "No updates provided" }, { status: 400 });
    }

    const todo = await prisma.todo.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, ctx: TodoRouteContext) {
  try {
    const { id } = await ctx.params;
    const existing = await prisma.todo.findUnique({ where: { id }, });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Todo not found" }, { status: 404 });
    }
    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Todo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to delete todo" }, { status: 500 });
  }
}
