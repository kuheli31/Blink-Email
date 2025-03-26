import React from 'react';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import SignInButton from './SignInButton';

function Header() {
    return (
        <div className='flex justify-between items-center p-1.5 shadow-md'>   
             <div className="flex items-center gap-4">
                <Image src={'/logo.svg'} alt='logo' width={90} height={90} />
                <Image src={'/logo1.svg'} alt='logo1' width={150} height={90} />
            </div>

            <div>
                <SignInButton/>
            </div>
        </div>
    );
}

export default Header;