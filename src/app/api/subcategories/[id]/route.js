import { dbConnect } from "@/utils/dbConnect";
import Subcategory from "@/models/Subcategory";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req, { params }) {
  try {
    const subcategory = await Subcategory.findById(params.id).populate(
      "category",
      "name description"
    );
    if (!subcategory) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, data: subcategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const subcategory = await Subcategory.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!subcategory) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, data: subcategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(params.id);
    if (!deletedSubcategory) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
