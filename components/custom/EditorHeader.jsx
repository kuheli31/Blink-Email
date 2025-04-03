"use client"
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CodeSquare, Monitor , Smartphone} from "lucide-react";
import { Code } from "lucide-react";
import { useScreenSize } from "@/app/provider"

function EditorHeader({ setViewHTMLCode }) {
    const { screenSize, setScreenSize } = useScreenSize();

    return (
        <div className="p-4 shadow-sm flex justify-between items-center">
            <Image src={'/logo.svg'} alt='logo' width={160} height={150} />
            <div className="flex gap-3">
                <Button variant="ghost" 
                    onClick={() => setScreenSize('desktop')}
                    className={`${screenSize === 'desktop' ? 'bg-purple-100 text-primary' : ''}`}>
                    <Monitor />
                    Desktop
                </Button>
                <Button variant="ghost" 
                    onClick={() => setScreenSize('mobile')}
                    className={`${screenSize === 'mobile' ? 'bg-purple-100 text-primary' : ''}`}>
                    <Smartphone />
                    Mobile
                </Button>
            </div>

            <div className="flex gap-3">
                <Button 
                    variant="ghost" 
                    className="hover:text-amber-50 hover:bg-primary"
                    onClick={() => setViewHTMLCode(true)}
                >
                    <Code />
                </Button>
                <Button variant="outline">Send Test Email</Button>
                <Button>Save Template</Button>
            </div>
        </div>
    );
}

export default EditorHeader;
