"use client"
import { useState, useEffect } from "react"; 
import React from 'react';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import SignInButton from './SignInButton';
import { useUserDetail } from '@/app/provider';
import Link from "next/link";

function Header() {
    const {userDetail , setUserDetail} = useUserDetail();

    return (
        <div className='flex justify-between items-center p-1.5 shadow-md'>   
             <div className="flex items-center gap-4">
                <Image src={'/logo.svg'} alt='logo' width={90} height={90} />
                <Image src={'/logo1.svg'} alt='logo1' width={150} height={90} />
            </div>

            <div>
                {userDetail?.email?
                <div className='flex gap-3 items-center'> 
                    <Link href={'/dashboard'}>
                        <Button>Dashboard</Button>
                    </Link>
                    <Image src={userDetail?.picture} alt='profile' width={35} height={35}  className="rounded-full"/>
                </div> : <SignInButton/>
                }
            </div>
        </div>
    );
}

export default Header;