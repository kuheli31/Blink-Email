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
import { ArrowDown, ArrowUp, Trash } from "lucide-react";

function ColumnLayout({ layout }) {
    const [dragOver, setDragOver] = useState();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const { dragElementLayout } = useDragElementLayout();
    const { selectedElement, setSelectedElement } = useSelectedElement();

    const onDragOverHandle = (event, index) => {
        event.preventDefault();
        setDragOver({ index: index, columnId: layout?.id });
    };

    const onDropHandle = () => {
        const index = dragOver.index;
        setEmailTemplate(prevItem =>
            prevItem?.map(col =>
                col.id === layout?.id ? { ...col, [index]: dragElementLayout?.dragElement } : col
            )
        );
        setDragOver(null);
    };

    const GetElementComponent = (element) => {
        if (element?.type === 'Button') return <ButtonComponent {...element} />;
        if (element?.type === 'Text') return <TextComponent style={element.style} content={element.textarea} />;
        if (element?.type === 'Image') return <ImageComponent {...element} />;
        if (element?.type === 'Logo') return <LogoComponent {...element} />;
        if (element?.type === 'Divider') return <DividerComponent {...element} />;
        if (element?.type === 'LogoHeader') return <LogoComponent {...element} />;
        if (element?.type === 'SocialIcons') return <SocialIconsComponent socialIcons={element.socialIcons} style={element.style} outerStyle={element.outerStyle} />;
        return element?.type;
    };

    const deleteLayout = (layoutId) => {
        setEmailTemplate(emailTemplate?.filter(item => item.id !== layoutId));
        setSelectedElement(null);
    };

    const moveItemUp = (layoutId) => {
        const index = emailTemplate.findIndex(item => item.id === layoutId);
        if (index > 0) {
            setEmailTemplate(prevItem => {
                const updatedItems = [...prevItem];
                [updatedItems[index], updatedItems[index - 1]] = [updatedItems[index - 1], updatedItems[index]];
                return updatedItems;
            });
        }
    };

    const moveItemDown = (layoutId) => {
        const index = emailTemplate.findIndex(item => item.id === layoutId);
        if (index < emailTemplate.length - 1) {
            setEmailTemplate(prevItem => {
                const updatedItems = [...prevItem];
                [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
                return updatedItems;
            });
        }
    };

    return (
        <div className='relative'>
            <div
                style={{ display: 'grid', gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`, gap: '0px' }}
                className={`${selectedElement?.layout?.id === layout?.id ? 'border border-dashed border-blue-500' : ''}`}
            >
                {Array.from({ length: layout?.numOfCol }).map((_, index) => (
                    <div key={index} className={`p-0 flex items-center h-full w-full bg-white cursor-pointer
                        ${layout?.[index]?.type ? 'bg-white' : ''} justify-center
                        ${index === dragOver?.index && dragOver?.columnId ? 'bg-sky-50' : ''}
                        ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index ? ' border-blue-500 border-4' : ''}`}
                        onDragOver={(event) => onDragOverHandle(event, index)}
                        onDrop={onDropHandle}
                        onClick={() => setSelectedElement({ layout: layout, index: index })}
                    >
                        {layout?.[index] ? GetElementComponent(layout[index]) : 'Drag Element Here'}
                    </div>
                ))}

                {selectedElement?.layout?.id === layout?.id && (
                    <div className='absolute -right-10 flex flex-col space-y-2'>
                        <div className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md' onClick={() => deleteLayout(layout?.id)}>
                            <Trash className='h-4 w-4 text-red-500' />
                        </div>
                        <div className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md' onClick={() => moveItemUp(layout.id)}>
                            <ArrowUp className='h-4 w-4' />
                        </div>
                        <div className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md' onClick={() => moveItemDown(layout.id)}>
                            <ArrowDown className='h-4 w-4' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ColumnLayout;