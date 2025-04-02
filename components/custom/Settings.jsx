"use client";
import { useSelectedElement } from "@/app/provider";
import React, { useEffect, useState } from "react";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
import ToggleGroupField from "./Settings/ToggleGroupField";
import { AlignCenter, AlignLeft, AlignRight, ArrowUp, CaseLowerIcon, CaseUpperIcon } from "lucide-react";
import DropdownField from "./Settings/DropdownField";

const TextAlignOptions=[
    {
        value:'left',
        icon:AlignLeft
    },
    {
        value:'center',
        icon:AlignCenter
    },
    {
        value:'right',
        icon:AlignRight
    }
]

const TextTransformOptions=[
    {
        value:'uppercase',
        icon:CaseUpperIcon
    },
    {
        value:'lowercase',
        icon:CaseLowerIcon
    },
    {
        value:'capitalize',
        icon:ArrowUp
    }
]

function Settings() {
    const { selectedElement, setSelectedElement } = useSelectedElement();
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (selectedElement) {
            setElement(selectedElement?.layout?.[selectedElement?.index]);
        }
    }, [selectedElement]);

    const onHandleInputChange = (fieldName, value) => {
        if (!selectedElement) return;

        const updatedData = { 
            ...selectedElement,
            layout: {
                ...selectedElement.layout,
                [selectedElement.index]: {
                    ...selectedElement.layout[selectedElement.index],
                    [fieldName]: value, 
                },
            },
        };

        setSelectedElement(updatedData); 
    };

    const onHandleStyleChange = (fieldName, fieldValue) => {
        if (!selectedElement || selectedElement.index === undefined) return;

        let updatedElement = {
            ...selectedElement,
            layout: {
                ...selectedElement.layout,
                [selectedElement.index]: {
                    ...selectedElement.layout[selectedElement.index],
                    style: {
                        ...(selectedElement.layout[selectedElement.index]?.style || {}),
                        [fieldName]: fieldValue,
                    },
                },
            },
        };

        setSelectedElement(updatedElement);
    };

    return (
        <div className="p-5 flex flex-col gap-4 bg-gray-50 shadow-md rounded-lg border border-gray-200 w-80">
            <h2 className="font-bold text-xl text-gray-700">Settings</h2>

            {element?.content !== undefined && (
                <InputField 
                    label={"Content"} 
                    value={element?.content || ""} 
                    onHandleInputChange={(value) => onHandleInputChange("content", value)} 
                />
            )}

            {element?.textarea !== undefined && (
                <>
                    <TextAreaField 
                        label={"Text Area"} 
                        value={element?.textarea || ""} 
                        onHandleInputChange={(value) => onHandleInputChange("textarea", value)} 
                        style={element?.style || {}} // ✅ Apply styles correctly
                    />

                    <ColorPickerField 
                        label="Text Area Background " 
                        value={element?.style?.backgroundColor || "#FFFFFF"} 
                        onHandleStyleChange={(value) => onHandleStyleChange("backgroundColor", value)} 
                    />
                </>
            )}

            {element?.style?.width && (
                <SliderField 
                    label={'Width = '} 
                    value={element?.style?.width}
                    type="%"
                    onHandleStyleChange={(value) => onHandleStyleChange('width', value)}
                />
            )}

            {element?.url !== undefined && (
                <InputField 
                    label={'URL'} 
                    value={element?.url || ""} 
                    onHandleInputChange={(value) => onHandleInputChange('url', value)} 
                />
            )}

            {element?.style?.backgroundColor && (
                <ColorPickerField 
                    label="Background Color "
                    value={element?.style?.backgroundColor}
                    onHandleStyleChange={(value) => onHandleStyleChange("backgroundColor", value)} 
                />
            )}

            {element?.style?.color && (
                <ColorPickerField 
                    label="Text Color "
                    value={element?.style?.color}
                    onHandleStyleChange={(value) => onHandleStyleChange("color", value)} 
                />
            )}

            {element?.style?.textTransform !== undefined && (
                <ToggleGroupField
                    label={'Text Transform'}
                    value={element?.style?.textTransform || "none"} // Ensure a default value
                    options={TextTransformOptions}
                    onHandleStyleChange={(value) => onHandleStyleChange('textTransform', value || "none")}
                />
            )}

            {element?.style.textAlign&&
                <ToggleGroupField
                    label={'Text Align'}
                    value={element?.style.textAlign}
                    options={TextAlignOptions}
                    onHandleStyleChange={(value)=>onHandleStyleChange('textAlign',value)}
                />
            }

            {element?.style?.fontSize && (
                <InputStyleField 
                    label={'Font Size'} 
                    value={element?.style?.fontSize}
                    onHandleStyleChange={(value) => onHandleStyleChange('fontSize', value)}
                />
            )}

            {element?.style?.padding && (
                <InputStyleField 
                    label={'Padding'} 
                    value={element?.style?.padding}
                    onHandleStyleChange={(value) => onHandleStyleChange('padding', value)}
                />
            )}

            {element?.style?.borderRadius && (
                <SliderField 
                    label={'Border Radius = '} 
                    value={element?.style?.borderRadius}
                    onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)}
                />
            )}

            {element?.style?.fontWeight && (
                <DropdownField 
                    label={'Font Width'} 
                    value={element?.style?.fontWeight}
                    options={['normal','bold']}
                    onHandleStyleChange={(value) => onHandleStyleChange('fontWeight', value)}
                />
            )}
        </div>
    );
}

export default Settings;
