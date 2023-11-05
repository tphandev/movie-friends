import { db } from "@/utilis/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { object, string } from "yup";

const validationSchema = object().shape({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = await validationSchema.validate(body);

    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const { password: _hashedPassword, ...newUser } = await db.user.create({
      data: { email, name, password: hashedPassword },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something were wrong!",
      },
      { status: 500 }
    );
  }
}
