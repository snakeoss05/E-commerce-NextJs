import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const limit = parseInt(searchParams.get("limit"), 10) || 10;
  const category = searchParams.get("category");
  const discount = searchParams.get("discount");
  const name = searchParams.get("name");
  if (page < 1 || limit < 1) {
    return NextResponse.json(
      { error: "Invalid pagination parameters" },
      { status: 400 }
    );
  }

  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (discount === "true") {
    filter.discount = { $ne: 0 };
  }
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }
  try {
    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments();
    return NextResponse.json(
      {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
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

export async function POST(req) {
  try {
    const data = await req.json();
    const product = await Product.create(data);

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
