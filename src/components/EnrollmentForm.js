import { React, useState } from "react";
import { MdEdit, MdDelete } from 'react-icons/md';
import '../App.css';

const EnrollmentForm = (props) => {
    // 즉, props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하기 위한 객체입니다.
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
    const [studKey, setStudKey] = useState(0);   // 수정 시 rndkey 대신 사용

    const handleEdit = (key, program) => {
        // 수정할 학생 정보를 폼에 표시
        handleFormInput(firstName, lastName, email);

        // 참가 프로그램 라디오 버튼에 표시
        props.setReSelectProgram(program);

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
            // 여기서 currentSeat은 UG를 골랐으면 usSeats PG를 골랐으면 pgSeats
            setMsgStyle('message');
            msg = `환영합니다 ${firstName} ${lastName}님!!\n
            ${email}로 등록 관련 정보를 발송해드렸습니다.`;

            // 등록 완료된 학생정보에 사용할 key 생성
            const rndKey = Math.floor(1000 + Math.random() * 9000);
            // 이렇게 생성된 무작위 숫자는 학생 정보 등록 시 고유한 key 값으로 사용되어,
            // 학생 정보 수정 및 삭제 기능에서 식별자 역할을 함

            // 학생 정보 등록 시 rndkey를, 학생 정보 수정 시 studKey를 사용하도록 함
            const key = btnValue === '등록하기' ? rndKey : studKey;

            // 생성한 key와 등록 완료된 학생정보를 props에 저장
            let stud = {
                key: key, fname: firstName, lname: lastName, program: props.chosenProgram, email: email,
                edit: <MdEdit className="actionIcon" onClick={ () => handleEdit(key, props.chosenProgram) } />,
                // 삭제 아이콘 클릭 시 대상 학생 정보의 키를 넘김
                delete: <MdDelete className="actionIcon" onClick={() => props.handleItemSelection('delete', key)} />,
            }
            props.setStudDetails(stud);
        }
        setWelcomeMessage(msg);
        e.preventDefault();   // submit 기능 전파 중지, 이벤트를 취소하는 메서드
    };
    const handleInputChange = (setInput, e) => {
        setInput(e.target.value)
    };
    // handleInputChange 함수는 input 요소의 값이 변경될 때마다 호출되어 input 요소의 값을 업데이트
    // 이 함수는 useState를 통해 관리되는 상태를 업데이트하기 위해 setInput과 이벤트 객체 e를 매개변수로 받음
    // setInput은 상태를 업데이트하기 위한 useState의 setter 함수입니다. e.target.value는 input 요소의 값으로,
    // 이 값을 setInput을 통해 상태로 업데이트함
    // 이렇게 함으로써 input 요소에 입력한 값을 상태로 관리할 수 있게 됨

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