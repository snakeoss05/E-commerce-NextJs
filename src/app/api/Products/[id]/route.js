import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req, { params }) {
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedProduct = await Product.deleteOne({ _id: params.id });
    if (!deletedProduct) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
