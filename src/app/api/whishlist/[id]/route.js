import { dbConnect } from "@/utils/dbConnect";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req, { params }) {
  try {
    const wishlist = await Wishlist.findById(params.id)
      .populate("user", "name email")
      .populate("products");
    if (!wishlist) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, data: wishlist },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const wishlist = await Wishlist.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!wishlist) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, data: wishlist },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedWishlist = await Wishlist.deleteOne({ _id: params.id });
    if (!deletedWishlist) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
