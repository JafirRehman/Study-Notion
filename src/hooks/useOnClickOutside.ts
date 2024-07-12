import { useEffect } from 'react';

export default function useOnClickOutside(refs:any, handler:any) {
    useEffect(() => {
        const listener = (event:any) => {
            if (refs.some((ref:any)=> !ref.current || ref.current.contains(event.target))) {
                return;
            } 
            handler();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        }
    }, [refs, handler]);

};