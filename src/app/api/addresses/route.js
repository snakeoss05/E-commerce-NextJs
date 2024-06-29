import { dbConnect } from "@/utils/dbConnect";
import Address from "@/models/Address";
import User from "@/models/User";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const addresses = await Address.find({}).populate("user", "name email");
    return NextResponse.json(
      { success: true, data: addresses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const address = await Address.create(data);

    await User.findByIdAndUpdate(address.user, {
      $push: { addresses: address._id },
    });

    return NextResponse.json({ success: true, data: address }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
