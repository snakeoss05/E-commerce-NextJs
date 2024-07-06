import { dbConnect } from "@/utils/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const order = await Order.create(data);
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
