import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import SignInButton from './SignInButton';

function Hero() {
    return (
        <div className='px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center mt-18'>   
            <h5 className='font-extrabold text-4xl'>Create <span className='text-primary'>Email Templates</span> with <span className='text-blue-900'>AI</span></h5>
            
            <p className='text-center mt-3'>Tired of spending hours crafting emails? Our AI-powered email template builder makes it effortless! ✨ Simply enter your content, and our smart system generates beautiful, professional, and responsive email templates instantly—no design or coding skills needed!</p>

            <Image src={'/landing.png'} alt='landing'
            width={1000}
            height={800}
            className='mt-12 rounded-xl'/>

            <div className='flex gap-5 mt-6 mb-20'>
                <Button variant="outline">Try Demo</Button>
                <SignInButton/>
            </div>
        </div>
    );
}

export default Hero;