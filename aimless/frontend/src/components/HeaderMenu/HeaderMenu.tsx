import React from "react";

import "./HeaderMenu.css";

export default function HeaderMenu() {
    return (
        <div className="headerMenu shadow_dance">
            <ul>
                <li>Home</li>
                <li>Explore</li>
                <li>Sign In</li>
                <li>Start Stream</li>
                <li>Settings</li>
            </ul>
        </div>
    );
}
