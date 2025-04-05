"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { ClipboardCopyIcon, CheckIcon } from "lucide-react"; // For copy button icons

function ViewHTMLdialogue({ opendialog, htmlcode, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlcode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    });
  };

  return (
    <Dialog open={opendialog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generated HTML Code</DialogTitle>
          <DialogDescription>Below is the generated HTML code:</DialogDescription>
        </DialogHeader>
        
        {/* Wrapper div to prevent overflow */}
        <div className="relative max-h-64 overflow-auto p-2 bg-gray-100 border rounded">
          <pre className="whitespace-pre-wrap break-words text-xs">{htmlcode}</pre>
          {/* Copy button */}
          <Button 
            onClick={handleCopy} 
            className="absolute top-2 right-2 p-1 text-gray-600 bg-white border rounded hover:bg-gray-200"
          >
            {copied ? <CheckIcon size={16} /> : <ClipboardCopyIcon size={16} />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewHTMLdialogue;