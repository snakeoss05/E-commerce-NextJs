import dbConnect from "@/utils/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req, { params }) {
  try {
    const order = await Order.findById(params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const order = await Order.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedOrder = await Order.deleteOne({ _id: params.id });
    if (!deletedOrder) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
