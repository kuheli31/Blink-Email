"use client"
import { useState } from "react";
import React from "react";
import { useDragElementLayout, useEmailTemplate } from "@/app/provider";
import Canvas from "../custom/Canvas";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";

function ColumnLayout({layout}){
    const [dragOver , setDragOver] = useState();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const {dragElementLayout, setDragElementLayout} = useDragElementLayout();

    const onDragOverHandle = (event, index) => {
        event.preventDefault();
        setDragOver({
            index: index,
            columnId: layout?.id
        });
    };

    const onDropHandle = () => {
        const index = dragOver.index;
        setEmailTemplate(prevItem => 
            prevItem?.map(col => 
                col.id === layout?.id ? { ...col, [index]: dragElementLayout?.dragElement } : col
            )
        )
        console.log(emailTemplate);
        setDragOver(null);
    };

    const GetElementComponent = (element) => {
        if(element?.type === 'Button')
        {
            return <ButtonComponent {...element}/>
        }
        else if(element?.type === 'Text')
        {
            return <TextComponent style={element.style} content={element.textarea} />
        }
        else if(element?.type === 'Image')
        {
            return <ImageComponent {...element}/>
        }
        else if(element?.type === 'Logo')
        {
            return <LogoComponent {...element}/>
        }
        else if(element?.type === 'Divider')
        {
            return <DividerComponent {...element}/>
        }
        return element?.type
    };

    return (
        <div>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
                gap: '0px',
            }}
            >
                {Array.from({length: layout?.numOfCol}).map((_, index) => (
                    <div key={index} className={`p-2 flex items-center 
                        ${layout?.[index]?.type && 'bg-white'} justify-center
                        ${(index === dragOver?.index && dragOver?.columnId) && 'bg-sky-50' }`}
                    onDragOver={(event) => onDragOverHandle(event, index)}
                    onDrop={onDropHandle}
                    >
                        {layout?.[index] ? GetElementComponent(layout[index]) : 'Drag Element Here'}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColumnLayout;
