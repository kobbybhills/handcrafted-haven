import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user (default role is 'customer')
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer", 
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}