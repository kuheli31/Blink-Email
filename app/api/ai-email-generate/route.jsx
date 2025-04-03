import { GenerateEmailTemplateAIModel } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req)
{
    const {prompt , userEmail , tId}= await req.json();

    try{
        const result=await GenerateEmailTemplateAIModel.sendMessage(prompt);
        const AIresponse = result.response.text();
        console.log(AIresponse);

        return NextResponse(AIresponse);
    }catch(e)
    {
        return NextResponse.json({error:e});
    }
}