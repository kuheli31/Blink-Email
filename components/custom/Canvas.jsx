"use client"
import React, { useEffect, useRef, useState } from "react";
import { useEmailTemplate, useScreenSize, useDragElementLayout } from "@/app/provider";
import ColumnLayout from "../LayoutElements/ColumnLayout";

function Canvas({ viewHTMLCode, setHtmlCode }) {
    const htmlRef = useRef();
    const { screenSize } = useScreenSize();
    const { dragElementLayout } = useDragElementLayout();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDropHandle = () => {
        setDragOver(false);
        if (dragElementLayout?.dragLayout) {
            setEmailTemplate(prev => [...(Array.isArray(prev) ? prev : []), dragElementLayout?.dragLayout]);

        }
    };

    const getLayoutComponent = (layout) => {
        if (layout?.type === 'column') {
            return <ColumnLayout layout={layout} />;
        }
    };

    useEffect(() => {
        if (viewHTMLCode) {
            generateHTMLCode();
        }
    }, [viewHTMLCode]);

    const generateHTMLCode = () => {
        if (htmlRef.current) {
            const htmlContent = htmlRef.current.innerHTML;
            setHtmlCode(htmlContent);  // Set the HTML content in state
        }
    };

    return (
        <div className='mt-20 flex justify-center'>
            <div 
                className={`bg-white p-6 w-full 
                ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}
                ${dragOver && 'bg-orange-200 p-4'}`}
                onDragOver={onDragOver}
                onDrop={onDropHandle}
                ref={htmlRef}
            >
                {emailTemplate?.length > 0 
                    ? emailTemplate.map((layout, index) => (
                        <div key={index}>
                            {getLayoutComponent(layout)}
                        </div>
                    )) 
                    : <h2 className='p-4 text-center bg-gray-100 border border-dashed'>Add Layout Here</h2>
                }
            </div>
        </div>
    );
}

export default Canvas;