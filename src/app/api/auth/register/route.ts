import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { registerSchema } from '@/lib/validations/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, fullName } = registerSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)

    // const user = await prisma.user.create({
    //   data: {
    //     name: fullName as string,
    //     email,
    //     password: hashedPassword,
    //   },
    // })

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
} 
