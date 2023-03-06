import { React, useState } from "react";
import { MdEdit, MdDelete } from 'react-icons/md';
import '../App.css';

const EnrollmentForm = (props) => {
    // 폼에 입력한 이름/성/이메일을 기억하게 위해 state형 변수 선언
    // onChange 이벤트 발생 시 입력한 이름/성/이메일을 firstName, lastName, email 변수에 저장
    const [firstName, setFirstName] = useState("");   // 인풋 태그에 작성했던 내용을 폼에 저장하기 위해
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // state형 변수에 저장된 이름/성을 환영메시지로 출력하기 위해 선언
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [msgStyle, setMsgStyle] = useState("redOne");

    // 등록/수정 버튼 정의
    const [btnValue, setBtnValue] = useState("등록하기");
    const [studKey, setStudKey] = useState(0);

    const handleEdit = (key) => {
        // 수정할 학생 정보를 폼에 표시
        handleFormInput(firstName, lastName, email);

        setStudKey(key);
        setBtnValue('수정하기');
    }

    // 등록하기 버튼 클릭 시 이름/성을 환영메시지로 만들어 폼 아래 쪽에 나타냄
    const handleSubmit = (e) => {
        let msg = `더 이상 참가할 수 없습니다.`;
        setMsgStyle('redOne');
        if (props.currentSeat - 1 >= 0) {
            // props로 전달 받은 함수 setUpdateSeats를 이용해서 상위 컴퍼넌트의 변수 값을 조작함
            props.setUpdateSeats(props.currentSeat - 1);   // 참여 가능 인원 수 감소
            setMsgStyle('message');
            msg = `환영합니다 ${firstName} ${lastName}님!!\n
            ${email}로 등록 관련 정보를 발송해드렸습니다.`;

            // 등록 완료된 학생정보에 사용할 key 생성
            const rndKey = Math.floor(1000 + Math.random() * 9000);

            // 학생 정보 등록 시 rndkey를, 학생 정보 수정 시 studKey를 사용하도록 함
            const key = btnValue === '등록하기' ? rndKey : studKey;

            // 생성한 key와 등록 완료된 학생정보를 props에 저장
            let stud = {
                key: key, fname: firstName, lname: lastName, program: props.choosenProgram, email: email,
                edit: <MdEdit className="actionIcon" onClick={ () => handleEdit(key) } />,
                // 삭제 아이콘 클릭 시 대상 학생 정보의 키를 넘김
                delete: <MdDelete className="actionIcon" onClick={() => props.handleItemSelection('delete', key)} />,
            }
            props.setStudDetails(stud);
        }
        setWelcomeMessage(msg);
        e.preventDefault();   // submit 기능 전파 중지
    };
    const handleInputChange = (setInput, e) => {
        setInput(e.target.value)
    };

    const handleFormInput = (fname, lname, email) => {
        setFirstName(fname);
        setLastName(lname);
        setEmail(email);
    };

    // 취소하기 버튼 클릭 시
    // 폼에 입력된 데이터 제거, 버튼의 글자 바꿈
    const handleCancel = (e) => {
        handleFormInput('', '', '');

        setBtnValue('등록하기');
        e.preventDefault();
    }
    return (
        <div>
            <div className="enrolContainer">
                <form className="enrolForm">
                    <ul className="ulEnrol">
                        <li>
                            <label htmlFor="FirstName"></label>
                            <input type="text" id="FirstName" name="firstName"
                                   className="inputFields" placeholder="First Name" value={firstName}
                                   onChange={e => handleInputChange(setFirstName, e)} />
                        </li>
                        <li>
                            <label htmlFor="LastName"></label>
                            <input type="text" id="LastName" name="lastName"
                                   className="inputFields" placeholder="Last Name" value={lastName}
                                   onChange={e => handleInputChange(setLastName, e)} />
                        </li>
                        <li>
                            <label htmlFor="Email"></label>
                            <input type="text" id="Email" name="email"
                                   className="inputFields" placeholder="Email" value={email}
                                   onChange={e => handleInputChange(setEmail, e)} />
                        </li>
                        <li id="center-btn">
                            <button type="submit" id="btnEnrol" className="btn" name="enrol"
                                    onClick={handleSubmit}>{btnValue}</button>
                        </li>
                        <li id="center-btn">
                            <button type="submit" id="btnCancel" className="btn" name="cancel"
                                    onClick={handleCancel}>취소하기</button>
                        </li>
                        <li>
                            <label id="studentMsg" className={msgStyle}>{welcomeMessage}</label>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
};

export default EnrollmentForm;