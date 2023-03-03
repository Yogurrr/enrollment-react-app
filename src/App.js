import React, {useState} from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import EnrollList from "./components/EnrollList";

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
                <h3 className="title"> 프로그램 참가 등록 양식 </h3>
                <ul className="ulEnrol">
                    <li onChange={handleChange} className="parentLabels">
                        <input type="radio" value="UG" name="programGroup" defaultChecked />학사 과정&nbsp;
                        <input type="radio" value="PG" name="programGroup" />석사 과정
                    </li>
                    <li>{program} 참가 가능 인원 : { (program === 'UG') ? ugSeats : pgSeats }</li>
                </ul>
            </div>
            <EnrollmentForm choosenProgram={program}
                            currentSeat={program === 'UG' ? ugSeats : pgSeats}
                            setUpdateSeats={setUpdateSeats} />
            <EnrollList />
        </div>
    );
    };


// 컴퍼넌트나 모듈 형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;