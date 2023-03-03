import React from "react";
import { useState } from "react";
import '../App.css';

const EnrollmentForm = (prop) => {
    // 폼에 입력한 이름/성을 기억하게 위해 state형 변수 선언
    // onBlur 이벤트 발생 시 입력한 이름/성을 firstName, lastName 변수에 저장
    const [firstName, setFirstName] = useState("");   // 인풋 태그에 작성했던 내용을 폼에 저장하기 위해
    const [lastName, setLastName] = useState("");
    // state형 변수에 저장된 이름/성을 환영메시지로 출력하기 위해 선언
    const [welcomeMessage, setWelcomeMessage] = useState("");

    // 등록하기 버튼 클릭 시 이름/성을 환영메시지로 만들어 폼 아래 쪽에 나타냄
    const handleSubmit = (e) => {
        setWelcomeMessage(`환영합니다 ${firstName} ${lastName}님!!`);
        // props로 전달 받은 함수 setUpdateSeats를 이용해서 상위 컴퍼넌트의 변수 값을 조작함
        prop.setUpdateSeats(prop.currentSeat - 1);   // 참여 가능 인원 수 감소
        e.preventDefault();   // submit 기능 전파 중지
    };
    return (
        <div>
            <form className="enrolForm" onSubmit={handleSubmit}>
                <h1>{prop.choosenProgram} 대학생 등록 양식</h1>
                <div><label>First Name</label>
                    <input type="text" name="fname"
                           onBlur={ (e) => setFirstName(e.target.value) } /></div>
                {/*The blur event fires when an element has lost focus.*/}

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