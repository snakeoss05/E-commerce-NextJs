import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const products = await Product.find({});
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const product = await Product.create(data);

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
