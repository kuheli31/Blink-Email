"use client"
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import Prompt from "@/Data/Prompt";
import axios from "axios";

function AIinputBox(){
    const [userInput , setUserInput] = useState();
    const [loading , setLoading] = useState(false);

    const onGenerate=async()=>{
        const PROMPT = Prompt.EMAIL_PROMPT+"\n-"+userInput;
        setLoading(true)
        try{
            const result = await axios.post('/api/ai-email-generate',{
                prompt:PROMPT,
                userEmail:'',
                tId:0
            });
            console.log(result);           
            setLoading(false);
        }catch(e)
        {
            console.log(e);
            setLoading(false);
        }
    }


    return (
      <div className="mt-5 ">
        <p className="mb-2">
          Enter your Email Template details and get a perfect template in
          seconds!
        </p>
        <Textarea
          placeholder="Write Here"
          rows="5"
          className="text-xl"
          onChange={(e) => setUserInput(e.target.value)}
        />

        <Button
          className="w-full mt-7"
          disabled={userInput?.length === 0 || loading}
          onClick={onGenerate}
        >
          {loading ? "Generating..." : "GENERATE"}
        </Button>
      </div>
    );
}

export default AIinputBox;