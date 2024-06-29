import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const user = await User.create(data);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
