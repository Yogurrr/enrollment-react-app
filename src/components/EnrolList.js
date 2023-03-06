import React from 'react';
import '../EnrolList.css';
import { DetailsList } from '@fluentui/react/lib/DetailsList';
import { useEffect } from "react";

// 과정 등록 학생 리스트 컬럼 정의 (이름, 성, 과정, 이메일)
// 리스트 앞 뒤로 수정, 삭제 버튼 추가
const columns = [
    {
        key: 'edit', name: "수정", fieldName: "edit", minWidth: "50", isResizeable: false
    },
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
    },
    {
        key: 'delete', name: "삭제", fieldName: "delete", minWidth: "50", isResizeable: false
    }
]

// 컬럼 정의 시 사용했던 fieldName으로 값 초기화
let items = [];

const EnrolList = (props) => {
    // 버전 등록 학생 데이터가 추가될 때 마다 UI를 재렌더링 하기 위해 useEffect 리액트 훅 사용
    // useEffect : 컴퍼넌트 생명주기에 따라 dom 렌더링 처리
    // props 객체에 값이 존재할 때 마다 detailsList에 렌더링해서 화면에 표시

    useEffect(() => {
        const curItemKey = props.studDetails.key;
        if (curItemKey) {
            items = [...items, props.studDetails];
            props.setStudDetails({});
        }
        // 삭제 기능 수행
        if (props.action === 'delete') {
            // 삭제 대상 아이템을 키로 가져옴
            const deleteItem = items.filter(
                (item) => item.key === props.selectedItemKey
            )[0];
            // 삭제 대상 아이템만 제외하고 다시 items 객체 생성 (찐 삭제가 아님)
            items = items.filter( (item) => item !== deleteItem );
        }
    },[props])
    return (
        <div className="enrolList">
            <DetailsList items={items} columns={columns} />
        </div>
    );
};

export default EnrolList;