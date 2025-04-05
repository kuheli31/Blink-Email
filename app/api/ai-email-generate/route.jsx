import { GenerateEmailTemplateAIModel } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { prompt, userEmail, tId } = await req.json();

    try {
        const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
        const AIresponse = await result.response.text(); // Ensure it's awaited properly

        return NextResponse.json({ message: JSON.parse(AIresponse) }); // Parse response correctly
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}
