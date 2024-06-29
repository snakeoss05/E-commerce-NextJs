import { dbConnect } from "@/utils/dbConnect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req, { params }) {
  try {
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const category = await Category.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    if (!deletedCategory) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
