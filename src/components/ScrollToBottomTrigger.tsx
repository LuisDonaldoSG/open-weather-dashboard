'use client';

import { useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';

export default function ScrollToBottomTrigger() {

    const childRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const scrollToBottom = searchParams.get('scrollToBottom') || 'false';

    useEffect(() => {
        if (childRef.current?.parentElement && scrollToBottom === 'true') {
            const parent = childRef.current.parentElement;
            setTimeout(() => {
                parent.scrollTop = parent.scrollHeight;
                console.log('adads');
            }, 1000);
        }
    }, [scrollToBottom]);

    return (
        <div ref={childRef} />
    );
}