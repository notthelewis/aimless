import React from "react";

import "./App.css";

function Content({ children }: { children: React.ReactNode }) {
    return <p className="content">{children}</p>;
}

function HeaderMenu({ children }: { children: React.ReactNode }) {
    return (
        <div className="headerMenu">
            <ul>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <header className="header bg_purple fg_purple">
                <h1>Aimless</h1>
            </header>
            {/*
             * Insert menu buttons here (home, explore, sign-in, start-stream, settings)
             * Menu buttons should not be visible on load, but when scroling down they
             * should appear from the bottom of the screen, shrinking (alongside the
             * header image) so that they fill about 20% of the horizontal screen space, as scolling continues.
             * This then becomes a 'sticky' header, which only expands when the user scrolls right back to the top.
             * Though, individual menu element will change colour and show tool tips upon scrolling.
             */}
            <Content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque autem impedit praesentium
                officia exercitationem quod asperiores eos nam magnam quidem dolorum, fugiat dignissimos accusamus
                inventore excepturi est fuga fugit.
            </Content>
        </div>
    );
}

export default App;
