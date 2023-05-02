import React from 'react'; 

// Global styles
import "../../App.css";

interface IMenuEntry {
    children: React.ReactNode;
    id: number;
}

export default function MenuEntry(props: IMenuEntry) {
    const [isSelected, setIsSelected]= React.useState(false);
    const { id } = props;

    const mouseOverHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log({id, isSelected});
        setIsSelected(prev => !prev);
    }

    return (
        <li 
            className={isSelected ? "light_shadow_flicker" : ""}
            onMouseEnter={mouseOverHandler}
            onMouseLeave={mouseOverHandler}
        >
            {props.children}
        </li>
    ) 
}
