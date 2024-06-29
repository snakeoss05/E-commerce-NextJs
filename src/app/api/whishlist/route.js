import dbConnect from "@/utils/dbConnect";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const wishlists = await Wishlist.find({})
      .populate("user", "name email")
      .populate("products");
    return NextResponse.json(
      { success: true, data: wishlists },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const wishlist = await Wishlist.create(data);
    return NextResponse.json(
      { success: true, data: wishlist },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
