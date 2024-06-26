import { useEffect } from 'react';

export default function useOnClickOutside(refs, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (refs.some((ref)=> !ref.current || ref.current.contains(event.target))) {
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