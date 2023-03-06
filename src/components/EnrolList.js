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
        // 삭제 기능 수행
        // eslint-disable-next-line no-restricted-globals
        if (props.action === 'delete' && confirm('정말로 삭제하시겠습니까?')) {
            // 삭제 대상 아이템을 키로 가져옴
            const deleteItem = items.filter(
                (item) => item.key === props.selectedItemKey
            )[0];
            // 삭제 대상 아이템만 제외하고 다시 items 객체 생성 (찐 삭제가 아님)
            items = items.filter( (item) => item !== deleteItem );
            // 삭제한 학생에 대한 참가 가능 인원 수 복구
            props.restoreSeats(deleteItem.program);
        }
        // ??

        // 등록하기와 수정하기를 구분하는 조건 추가
        const curItemKey = props.studDetails.key;
        if (curItemKey) {
            // 전달받은 키와 리스트에서 일치하는 항목의 index를 알아냄
            const idx = items.findIndex( (item) => item.key === curItemKey );

            if (idx > -1) {   // 키와 일치하는 항목이 리스트에 존재한다면
                // 수정하기로 간주하고 해당 항목에 대해 수정 작업 수행
                items = items.map( (item) => item.key === curItemKey ? props.studDetails : item );
            } else {   // 키와 일치하는 항목이 리스트에 존재하지 않는다면
                       // 등록하기로 가눚하고 해당 항목은 새로운 항목으로 취급
                items = [...items, props.studDetails];
            }
            props.setStudDetails({});
        }
    })

    return (
        <div className="enrolList">
            <DetailsList items={items} columns={columns} />
        </div>
    );
};

export default EnrolList;