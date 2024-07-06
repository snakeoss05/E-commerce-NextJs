import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const limit = parseInt(searchParams.get("limit"), 10) || 10;
  const name = searchParams.get("name");
  console.log(name);
  const filter = {};

  if (name && name != "" && name != null) {
    filter.name = { $regex: name, $options: "i" };
  }
  try {
    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("name price image stock");

    const total = await Product.countDocuments();
    return NextResponse.json(
      {
        data: products,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
