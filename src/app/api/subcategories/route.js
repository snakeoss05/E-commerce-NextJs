import { dbConnect } from "@/utils/dbConnect";
import Subcategory from "@/models/Subcategory";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const subcategories = await Subcategory.find({}).populate(
      "category",
      "name description"
    );
    return NextResponse.json(
      { success: true, data: subcategories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const subcategory = await Subcategory.create(data);
    return NextResponse.json(
      { success: true, data: subcategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
