import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

/**
 * @file This file contains an unused API route handler for updating filter data.
 * It is not currently utilized in the application.
 */
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
