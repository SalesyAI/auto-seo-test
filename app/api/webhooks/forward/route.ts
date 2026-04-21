import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!N8N_WEBHOOK_URL) {
      console.error("N8N_WEBHOOK_URL not configured");
      return NextResponse.json(
        { success: false, message: "Webhook not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Webhook failed:", response.statusText);
      return NextResponse.json(
        { success: false, message: "Failed to forward webhook" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Webhook forwarded successfully",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
