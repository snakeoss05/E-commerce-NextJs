import { dbConnect } from "@./utils/dbConnect";
import Address from "@./models/Address";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req, { params }) {
  try {
    const address = await Address.findById(params.id).populate(
      "user",
      "name email"
    );
    if (!address) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: address }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const address = await Address.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!address) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: address }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedAddress = await Address.findByIdAndDelete(params.id);
    if (!deletedAddress) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    await User.findByIdAndUpdate(deletedAddress.user, {
      $pull: { addresses: deletedAddress._id },
    });

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
