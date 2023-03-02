import React from "react";
import { useState } from "react";
import '../App.css';

const EnrollmentForm = () => {
    const [firstName, setFirstName] = useState("");   // 인풋 태그에 작성했던 내용을 폼에 저장하기 위해
    const [lastName, setLastName] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");

    const handleSubmit = (e) => {
        setWelcomeMessage(`환영합니다 ${firstName} ${lastName}님!!`);
        e.preventDefault();   // submit 기능 중지
    };
    return (
        <div>
            <form className="enrolForm" onSubmit={handleSubmit}>
                <h1>대학생 등록 양식</h1>
                <div><label>First Name</label>
                    <input type="text" name="fname"
                           onBlur={ (e) => setFirstName(e.target.value) } /></div>

                <div><label>Last Name</label>
                    <input type="text" name="lname"
                           onBlur={ (e) => setLastName(e.target.value) } /></div>

                <div><button type="submit"
                             onBlur={ (e) => setWelcomeMessage(e.target.value) }>등록하기</button></div>
            </form>

            <label id="studentMsg" className="message">
                {welcomeMessage}
            </label>
        </div>
    );
};

export default EnrollmentForm;