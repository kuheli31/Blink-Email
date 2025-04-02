"use client";
import React, { useState, useEffect, useContext } from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from '@/context/userDetailContext';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { DragDropLayoutElement } from '@/context/DragDropLayoutElement';
import { EmailTemplateContext } from '@/context/EmailTemplateContext';
import { SelectedElementContext } from '@/context/SelectedElementContext';

function Provider({ children }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    const [userDetail, setUserDetail] = useState();
    const [screenSize, setScreenSize] = useState('desktop');
    const [dragElementLayout, setDragElementLayout] = useState();
    const [emailTemplate, setEmailTemplate] = useState([]);
    const [selectedElement, setSelectedElement] = useState();

    //Checking if user is logged in or not
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = JSON.parse(localStorage.getItem("userDetail"));
            const emailTemplateStorage=JSON.parse(localStorage.getItem('emailTemplate'));
            setEmailTemplate(emailTemplateStorage ?? []);
            if (!storage?.email || !storage) {
                //Redirect to homescreen
            } else {
                setUserDetail(storage);
            }
        }
    }, []);

    useEffect(()=>{
        if(typeof window!== undefined)
        {
            localStorage.setItem('emailTemplate',JSON.stringify(emailTemplate))
        }
    },[emailTemplate])

    useEffect(()=>{
        if(selectedElement)
        {
            let updatedEmailTemplates = [];
            emailTemplate.forEach((item,index)=>{
                if(item.id === selectedElement?.layout?.id)
                {
                    updatedEmailTemplates?.push(selectedElement?.layout)
                }
                else
                {
                    updatedEmailTemplates.push(item)
                }
            })
            setEmailTemplate(updatedEmailTemplates);
        }
    },[selectedElement])

    return (
        <ConvexProvider client={convex}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                    <ScreenSizeContext.Provider value={{screenSize, setScreenSize}}>
                        <DragDropLayoutElement.Provider value={{dragElementLayout, setDragElementLayout}}>
                            <EmailTemplateContext.Provider value={{emailTemplate, setEmailTemplate}}>
                                <SelectedElementContext.Provider value={{selectedElement, setSelectedElement}}>
                                    <div>{children}</div>
                                </SelectedElementContext.Provider>
                            </EmailTemplateContext.Provider>
                        </DragDropLayoutElement.Provider>
                    </ScreenSizeContext.Provider>
                </UserDetailContext.Provider>
            </GoogleOAuthProvider>
        </ConvexProvider>
    );
}

export default Provider;

export const useUserDetail = () => {
    return useContext(UserDetailContext);
};

export const useScreenSize = () => {   
    return useContext(ScreenSizeContext); 
}

export const useDragElementLayout = () => {
    return useContext(DragDropLayoutElement); 
}

export const useEmailTemplate = () => {
    return useContext(EmailTemplateContext); 
}

export const useSelectedElement = () => {
    return useContext(SelectedElementContext); 
}