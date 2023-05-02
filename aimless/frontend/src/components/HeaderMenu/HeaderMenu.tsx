import React from "react";

import "./HeaderMenu.css";
import MenuEntry from "./MenuEntry";

export default function HeaderMenu() {
    const [selected, setSelected] = React.useState(0);

    const menuEntries = ["Home", "Explore", "Sign in", "Start stream", "Settings"];

    return (
        <div className="headerMenu shadow_dance">
            <ul>
                {menuEntries.map((entry: string, index: number) => {
                return <li key={index}>{entry}</li>
//                    return (
//                        <MenuEntry id={index} key={index}>
//                            {entry}
//                        </MenuEntry>
//                    );
                })}
            </ul>
        </div>
    );
}
