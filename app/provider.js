"use client";
import React, { useState, useEffect, useContext } from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from '@/context/userDetailContext';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { DragDropLayoutElement } from '@/context/DragDropLayoutElement';
import { EmailTemplateContext } from '@/context/EmailTemplateContext';

function Provider({ children }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    const [userDetail, setUserDetail] = useState();
    const [screenSize, setScreenSize] = useState('desktop');
    const [dragElementLayout, setDragElementLayout] = useState();
    const [emailTemplate, setEmailTemplate] = useState([]);

    //Checking if user is logged in or not
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = JSON.parse(localStorage.getItem("userDetail"));
            if (!storage?.email || !storage) {
                //Redirect to homescreen
            } else {
                setUserDetail(storage);
            }
        }
    }, []);

    return (
        <ConvexProvider client={convex}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                    <ScreenSizeContext.Provider value={{screenSize, setScreenSize}}>
                        <DragDropLayoutElement.Provider value={{dragElementLayout, setDragElementLayout}}>
                            <EmailTemplateContext.Provider value={{emailTemplate, setEmailTemplate}}>
                                <div>{children}</div>
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