"use client";
import { useSelectedElement } from "@/app/provider";
import React, { useEffect, useState } from "react";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
import ToggleGroupField from "./Settings/ToggleGroupField";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowUp,
  CaseLowerIcon,
  CaseUpperIcon,
} from "lucide-react";
import DropdownField from "./Settings/DropdownField";
import ImagePreview from "./Settings/ImagePreview";

const TextAlignOptions = [
  { value: "left", icon: AlignLeft },
  { value: "center", icon: AlignCenter },
  { value: "right", icon: AlignRight },
];

const TextTransformOptions = [
  { value: "uppercase", icon: CaseUpperIcon },
  { value: "lowercase", icon: CaseLowerIcon },
  { value: "capitalize", icon: ArrowUp },
];

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

    // Ensure valid string value
    const safeValue =
      fieldValue !== undefined && fieldValue !== null && fieldValue !== ""
        ? fieldValue.toString()
        : "0px";

    let updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          style: {
            ...(selectedElement.layout[selectedElement.index]?.style || {}),
            [fieldName]: safeValue,
          },
        },
      },
    };

    setSelectedElement(updatedElement);
  };

  const onHandleOuterStyleChange = (fieldName, fieldValue) => {
    if (!selectedElement || selectedElement.index === undefined) return;

    // Ensure valid string value
    const safeValue =
      fieldValue !== undefined && fieldValue !== null && fieldValue !== ""
        ? fieldValue.toString()
        : "0px";

    let updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          outerStyle: {
            ...(selectedElement.layout[selectedElement.index]?.outerStyle ||
              {}),
            [fieldName]: safeValue,
          },
        },
      },
    };

    setSelectedElement(updatedElement);
  };

  return (
    <div className="p-5 flex flex-col gap-4 bg-gray-50 shadow-md rounded-lg border border-gray-200 w-80">
      <h2 className="font-bold text-xl text-gray-700">Settings</h2>

      {element?.imageUrl !== undefined && (
        <ImagePreview
          label={"Image Preview"}
          value={element?.imageUrl || ""}
          onHandleInputChange={(value) =>
            onHandleInputChange("imageUrl", value)
          }
        />
      )}

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
            onHandleInputChange={(value) =>
              onHandleInputChange("textarea", value)
            }
            style={element?.style || {}}
          />

          <ColorPickerField
            label="Text Area Background "
            value={element?.style?.backgroundColor || "#FFFFFF"}
            onHandleStyleChange={(value) =>
              onHandleStyleChange("backgroundColor", value)
            }
          />
        </>
      )}

      {element?.style?.width && (
        <SliderField
          label={"Width = "}
          value={element?.style?.width}
          type="%"
          onHandleStyleChange={(value) => onHandleStyleChange("width", value)}
        />
      )}

      {element?.url !== undefined && (
        <InputField
          label={"URL"}
          value={element?.url || ""}
          onHandleInputChange={(value) => onHandleInputChange("url", value)}
        />
      )}

      {element?.style?.backgroundColor && (
        <ColorPickerField
          label="Background Color "
          value={element?.style?.backgroundColor}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("backgroundColor", value)
          }
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
          label={"Text Transform"}
          value={element?.style?.textTransform || "none"}
          options={TextTransformOptions}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("textTransform", value || "none")
          }
        />
      )}

      {element?.style?.textAlign && (
        <ToggleGroupField
          label={"Text Align"}
          value={element?.style?.textAlign}
          options={TextAlignOptions}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("textAlign", value)
          }
        />
      )}

      {element?.style?.fontSize && (
        <InputStyleField
          label={"Font Size"}
          value={element?.style?.fontSize}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("fontSize", value)
          }
        />
      )}

      {element?.style?.padding && (
        <InputStyleField
          label={"Padding"}
          value={element?.style?.padding}
          onHandleStyleChange={(value) => onHandleStyleChange("padding", value)}
        />
      )}

      {element?.style?.margin !== undefined && (
        <InputStyleField
          label={"Margin"}
          value={element?.style?.margin || "0px"}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("margin", value.toString())
          }
        />
      )}

      {element?.style?.borderRadius && (
        <SliderField
          label={"Border Radius = "}
          value={element?.style?.borderRadius}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("borderRadius", value)
          }
        />
      )}

      {element?.style?.fontWeight && (
        <DropdownField
          label={"Font Width"}
          value={element?.style?.fontWeight}
          options={["normal", "bold"]}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("fontWeight", value)
          }
        />
      )}

      <div className="p-5 flex flex-col gap-4 bg-gray-50 shadow-md rounded-lg border border-gray-200 w-75">
        <h2 className="font-bold mb-2">Outer Style</h2>
        {/* Update outer background color for images, logos, headers, text */}
        {(element?.imageUrl !== undefined ||
          element?.logo !== undefined ||
          element?.logoHeader !== undefined ||
          element?.content !== undefined) && (
          <ColorPickerField
            label="Outer Background Color  "
            value={element?.outerStyle?.backgroundColor || "#FFFFFF"} // Default to white if undefined
            onHandleStyleChange={(value) =>
              onHandleOuterStyleChange("backgroundColor", value)
            }
          />
        )}

        {element?.outerStyle?.justifyContent && (
          <ToggleGroupField
            label={"Align "}
            value={element?.outerStyle?.justifyContent}
            options={TextAlignOptions}
            onHandleStyleChange={(value) =>
              onHandleOuterStyleChange("justifyContent", value)
            }
          />
        )}
      </div>
    </div>
  );
}

export default Settings;
