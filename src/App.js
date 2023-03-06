import React, { useState } from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import EnrolList from "./components/EnrolList";

// EnrollmentForm이라는 폼을 return하도록 정의된 App 컴퍼넌트
const App = () => {
    const [program, setProgram] = useState("UG");   // 프로그램 종류
    const [ugSeats, setUgSeats] = useState(60);
    const [pgSeats, setPgSeats] = useState(40);

    // 과정 등록한 학생 정보를 저장하는 변수 선언
    const [studDetails, setStudDetails] = useState({});
    // 여기서 {}는 빈 객체(empty object)를 뜻함

    const [action, setAction] = useState();   // 작업 종류 지정
    const [selectItemKey, setSelItemKey] = useState();   // 등록정보 키

    // 라디오 버튼 체크 상태 처리, 초기값은 true로 설정
    const [isUgChecked, setIsUgChecked] = useState(true);
    // (삭제나 수정 시) 인원 수 조정 필요 여부 설정, 초기값은 false로 설정
    const [isRestoreSeats, setIsRestoreSeats] = useState(false);


    const handleChange = (e) => {
        setProgram(e.target.value);
        // 참가 프로그램이 혹시라도 변경됐다면
        setIsUgChecked(!isUgChecked);
        if (isRestoreSeats) {   // 변경 전 인원 수를 원래대로 복원
            e.target.value === 'UG' ? setPgSeats(pgSeats + 1) : setUgSeats(ugSeats + 1);
            setIsRestoreSeats(false);
        }
    };

    // 프로그램 참가 가능 인원 수를 변경하는 함수
    const setUpdateSeats = (modifySeat) => {
        if (program === 'UG') {
            setUgSeats(modifySeat);
        } else {
            setPgSeats(modifySeat);
        }
    }

    // 작업 종류, 키 설정 함수
    const handleItemSelection = (action, key) => {
        setAction(action);
        setSelItemKey(key);
    }

    // 등록 학생 삭제나 수정 시 참가 가능 인원 수 재수정
    const restoreSeats = (pgm) => {
        pgm === 'UG' ? setUgSeats(ugSeats + 1) :
            setPgSeats(pgSeats + 1);
        setAction('');
    }

    // 수정 시 참가 프로그램 변경 시 인원수 재수정
    const setReSelectProgram = (selProgram) => {
        selProgram === 'UG' ? setIsUgChecked(true) : setIsUgChecked(false);
        setProgram(selProgram);
        setIsRestoreSeats(true);
    }

    return (
        <div className="App">
            <div className="programs">
                <h3 className="title"> 프로그램 참가 등록 양식 </h3>
                <ul className="ulEnrol">
                    <li onChange={handleChange} className="parentLabels">
                        <input type="radio" value="UG" name="programGroup"
                               defaultChecked={isUgChecked} />학사 과정&nbsp;
                        <input type="radio" value="PG" name="programGroup"
                               defaultChecked={!isUgChecked} />석사 과정
                    </li>
                    <li>{program} 참가 가능 인원 : { (program === 'UG') ? ugSeats : pgSeats }</li>
                </ul>
            </div>
            <EnrollmentForm chosenProgram={program} currentSeat={program === 'UG' ? ugSeats : pgSeats}
                            setUpdateSeats={setUpdateSeats} setStudDetails={setStudDetails}
                            handleItemSelection={handleItemSelection} setReSelectProgram={setReSelectProgram} />

            <EnrolList studDetails={studDetails} setStudDetails={setStudDetails} selectedItemKey={selectItemKey}
                       action={action} restoreSeats={restoreSeats} setAction={setAction} />
            {/* <EnrollmentForm />와 <EnrolList />는 컴포넌트를 불러오는 구문 */}
        </div>
    );
    };


// 컴퍼넌트나 모듈 형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;