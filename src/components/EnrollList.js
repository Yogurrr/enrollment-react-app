import React from 'react';
// import './EnrolList.css';
import { DetailsList } from '@fluentui/react/lib/DetailsList';

// 과정 등록 학생 리스트 컬럼 정의 (이름, 성, 과정, 이메일)
const columns = [
    {
        key: 'fname', name: 'First Name', fieldName: 'fname', minWidth: 90, isResizeable: false
    },
    {
        key: 'lname', name: 'Last Name', fieldName: 'lname', minWidth: 90, isResizeable: false
    },
    {
        key: 'program', name: '과정 종류', fieldName: 'program', minWidth: 90, isResizeable: false
    },
    {
        key: 'email', name: '이메일', fieldName: 'email', minWidth: 130, isResizeable: false
    }
]

// 테스트용 데이터 삽입
let items = [];
for (let i = 1; i <= 5; ++i ) {
    let data = {key: i, fname: 'FirstName'+i, lname: 'LastName'+i, program: 'UG', email: 'Email'+i}
    items.push(data);
}
const EnrollList = () => {
    return (
        <div className="enrolList">
            <DetailsList items={items} columns={columns} />
        </div>
    );
};

export default EnrollList;