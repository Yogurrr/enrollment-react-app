import React from "react";
import EnrollmentForm from "./components/EnrollmentForm";

// EnrollmentForm이라는 폼을 return하도록 정의된 App 컴퍼넌트
const App = () => {
    return (
        <div>
            <EnrollmentForm />
        </div>
    );
};

// 컴퍼넌트나 모듈 형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;