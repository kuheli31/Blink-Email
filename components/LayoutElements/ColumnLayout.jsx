"use client"
import { useState } from "react";
import React from "react";
import { useDragElementLayout, useEmailTemplate, useSelectedElement } from "@/app/provider";
import Canvas from "../custom/Canvas";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import SocialIconsComponent from "../custom/Element/SocialIconsComponent";

function ColumnLayout({layout}){
    const [dragOver , setDragOver] = useState();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const {dragElementLayout, setDragElementLayout} = useDragElementLayout();
    const {selectedElement, setSelectedElement} = useSelectedElement();

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
        else if(element?.type === 'LogoHeader')
        {
            return <LogoComponent {...element}/>
        }
        else if(element?.type === 'SocialIcons') 
        {
            return <SocialIconsComponent socialIcons={element.socialIcons} style={element.style} outerStyle={element.outerStyle} />
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
                    <div key={index} className={`p-0 flex items-center h-full w-full bg-white cursor-pointer
                        ${layout?.[index]?.type && 'bg-white'} justify-center
                        ${(index === dragOver?.index && dragOver?.columnId) && 'bg-sky-50' }
                        ${(selectedElement?.layout?.id==layout?.id && selectedElement?.index == index) && ' border-blue-500 border-2'}
                        `}
                    onDragOver={(event) => onDragOverHandle(event, index)}
                    onDrop={onDropHandle}
                    onClick={()=>setSelectedElement({layout:layout , index:index})}
                    >
                        {layout?.[index] ? GetElementComponent(layout[index]) : 'Drag Element Here'}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColumnLayout;
