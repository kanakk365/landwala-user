import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the SVG from the external URL (server-side, no CORS restrictions)
    const response = await fetch(url, {
      headers: {
        Accept: "image/svg+xml",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch SVG: ${response.statusText}` },
        { status: response.status }
      );
    }

    const svgContent = await response.text();

    // Return the SVG content with proper headers
    return new NextResponse(svgContent, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error proxying SVG:", error);
    return NextResponse.json({ error: "Failed to fetch SVG" }, { status: 500 });
  }
}
