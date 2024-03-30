import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.todo.createMany({
    data: [
      {
        description: "Stone Soul",
        complete: true,
      },
      {
        description: "Stone Power",
      },
      {
        description: "Stone Time",
      },
      {
        description: "Stone Space",
      },
      {
        description: "Stone Reality",
      },
    ],
  });
  return new Response(
    JSON.stringify({
      message: "Seed Succesfully applied",
    }),
    { status: 200 }
  );
}
