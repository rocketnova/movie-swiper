import { useLayoutEffect, useState } from 'react';

const useViewportWidth = () => {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return { width };
};

export default useViewportWidth;
