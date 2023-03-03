import React, {useState} from "react";
import EnrollmentForm from "./components/EnrollmentForm";

// EnrollmentForm이라는 폼을 return하도록 정의된 App 컴퍼넌트
const App = () => {
    const [program, setProgram] = useState("UG");   // 프로그램 종류
    // const [seats, setSeats] = useState(100);   // 참가 가능 인원 수
    const [ugSeats, setUgSeats] = useState(60);
    const [pgSeats, setPgSeats] = useState(40);
    const handleChange = (e) => {
        setProgram(e.target.value)
    };

    // 프로그램 참가 가능 인원 수를 변경하는 함수
    const setUpdateSeats = (modifySeat) => {
        if (program === 'UG') {
            setUgSeats(modifySeat);
        } else {
            setPgSeats(modifySeat);
        }
    }
    return (
        <div className="App">
            <div className="programs">
                <label>학사 과정 참가 가능 인원 수 : {ugSeats}</label>
                <br/>
                <label>석사 과정 참가 가능 인원 수 : {pgSeats}</label>
                <br/><br/>
                <label>프로그램 종류 : </label>
                <select className="appDropDowns" onChange={handleChange} value={program}>
                    <option value="UG">학사 과정(대학생)</option>
                    <option value="PG">석사 과정(대학원생)</option>
                </select>
                <br/><br/><br/>
            </div>
            <EnrollmentForm choosenProgram={program}
                            currentSeat={program === 'UG'? ugSeats : pgSeats}
                            setUpdateSeats={setUpdateSeats} />
        </div>
    );
};

// 컴퍼넌트나 모듈 형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;