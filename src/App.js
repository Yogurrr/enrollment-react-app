import React, {useState} from "react";
import EnrollmentForm from "./components/EnrollmentForm";

// EnrollmentForm이라는 폼을 return하도록 정의된 App 컴퍼넌트
const App = () => {
    const [program, setProgram] = useState("UG");   // 프로그램 종류
    const [seats, setSeats] = useState(100);   // 참가 가능 인원 수
    const handleChange = (e) => {
        setProgram(e.target.value)
    };

    // 참가 가능 인원 수를 변경하는 함수
    const setUpdateSeats = (modifySeat) => {
        setSeats(modifySeat);
    }
    return (
        <div className="App">
            <div className="programs">
                <label>프로그램 참가 가능 인원 수 : {seats}</label>
                <br />
                <label>프로그램 종류 : </label>
                <select className="appDropDowns" onChange={handleChange} value={program}>
                    <option value="UG">학사 과정(대학생)</option>
                    <option value="PG">석사 과정(대학원생)</option>
                </select>
            </div>
            <EnrollmentForm choosenProgram={program} currentSeat={seats} setUpdateSeats={setUpdateSeats} />
        </div>
    );
};

// 컴퍼넌트나 모듈 형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;