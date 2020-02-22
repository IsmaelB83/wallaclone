// NPM Modules
import React from 'react';

const HideOnScrollDown = () => {
    // Variables
    const prevScrollY = React.useRef();
    const [hide, setHide] = React.useState(false);
    // Hook
    React.useEffect(() => {
        // When scrolling
        const onScroll = () => {
            setHide(hide => {
                const scrolledDown = window.scrollY > prevScrollY.current;
                if (window.scrollY < 100) return false;
                else if (scrolledDown && !hide) return true;
                else if (!scrolledDown && hide) return false;
                else {
                    prevScrollY.current = window.scrollY;
                    return hide;
                }
            });
        };
        // Listeners 
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return hide;
};

export default HideOnScrollDown;
  