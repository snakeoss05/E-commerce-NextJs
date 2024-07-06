import { dbConnect } from "@/utils/dbConnect";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(req, { params }) {
  const data = await req.json();

  try {
    const wishlist = await Wishlist.findOne({ userId: params.id });
    if (wishlist && wishlist.productId.includes(data)) {
      return NextResponse.json(
        { success: true, data: wishlist },
        { status: 201 }
      );
    }

    if (wishlist) {
      wishlist.productId.push(data);
      await wishlist.save();

      return NextResponse.json(
        { success: true, data: wishlist },
        { status: 201 }
      );
    }

    await Wishlist.create({ userId: params.id, productId: data });
    return NextResponse.json(
      { success: true, data: wishlist },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
export async function GET(req, { params }) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 404 }
      );
    }

    const wishlist = await Wishlist.findOne({ userId: params.id }).populate(
      "productId"
    );

    if (!wishlist) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: wishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
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
