import React from "react";

// Global CSS Styling
// TODO: Add CSS Modules
import "./App.css";

import { HeaderMenu, Header } from "./components";

// function Content({ children }: { children: React.ReactNode }) {
//     return <p className="content">{children}</p>;
// }

function App() {
    return (
        <div className="App">
            <Header />
            {/*
             * TODO:
             * HeaderMenu buttons should not be visible on load, but when scroling down they
             * should appear from the bottom of the screen, shrinking (alongside the
             * header image) so that they fill about 20% of the horizontal screen space, as scolling continues.
             * This then becomes a 'sticky' header, which only expands when the user scrolls right back to the top.
             * Though, individual menu element will change colour and show tool tips upon scrolling.
             */}
            <HeaderMenu />
        </div>
    );
}

export default App;
