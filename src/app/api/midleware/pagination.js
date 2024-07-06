import { NextResponse } from "next/server";

export async function paginationMiddleware(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const limit = parseInt(searchParams.get("limit"), 10) || 10;

  if (page < 1 || limit < 1) {
    return NextResponse.json(
      { error: "Invalid pagination parameters" },
      { status: 400 }
    );
  }

  const offset = (page - 1) * limit;

  req.pagination = { page, limit, offset };

  return NextResponse.next();
}
