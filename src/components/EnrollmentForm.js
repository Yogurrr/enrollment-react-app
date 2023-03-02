import React from "react";
import '../App.css';

const EnrollmentForm = () => {
    return (
        <div>
            <form className="enrolForm"></form>
            <h1>대학생 등록 양식</h1>
            <div><label>First Name</label>
                <input type="text" name="fname" /></div>
            <div><label>Last Name</label>
                <input type="text" name="lname" /></div>
            <div><button type="submit">등록하기</button></div>
        </div>
    );
};

export default EnrollmentForm;