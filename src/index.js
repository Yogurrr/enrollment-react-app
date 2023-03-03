import React from "react";
import ReactDOM from "react-dom";
// App 컴퍼넌트 가져오기(import) 선언문
import App from "./App.js";

// ReactDOM 라이브러리의 render 함수에 의해
// index.html의 태그들 중 id가 app인 요소에
// 해당 컴퍼넌트를 표시함
// render(컴퍼넌트, 표시위치)
ReactDOM.render(
    <React.StrictMode>
        <h1>Just React</h1>
    </React.StrictMode>,
    document.querySelector('#app')
)

// App이라는 컴퍼넌트를 #root에 표시
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector('#root')
)