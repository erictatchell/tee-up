import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const filePath = path.join(process.cwd(), "data", "filters.json");
    const newFilters = await req.json();

    await fs.writeFile(filePath, JSON.stringify(newFilters, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating filters:", error);
    return NextResponse.json({ error: "Failed to update filters" }, { status: 500 });
  }
}
