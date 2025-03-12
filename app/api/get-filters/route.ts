import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data", "filters.json");
        const filters = await fs.readFile(filePath, "utf8");

        return NextResponse.json(JSON.parse(filters));
    } catch (error) {
        console.error("Error fetching filters:", error);
        return NextResponse.json({ error: "Failed to load filters" }, { status: 500 });
    }
}