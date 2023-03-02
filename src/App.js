import React from "react";

const App = () => {

    const ClickHandler = () => {
        alert('Starting React!!');
    };
    return (
        <div>
            <button type="button" onClick={ClickHandler}>Click React</button>
        </div>
    );
};

export default App;