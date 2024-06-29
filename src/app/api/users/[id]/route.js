import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req, { params }) {
  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const user = await User.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedUser = await User.deleteOne({ _id: params.id });
    if (!deletedUser) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
