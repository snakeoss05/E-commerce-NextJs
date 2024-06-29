import { dbConnect } from "@/utils/dbConnect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const categories = await Category.find({});
    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const category = await Category.create(data);
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
