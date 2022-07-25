import React, { useEffect } from 'react'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

export default function IndexCyberBugs(props) {
    const { projectDetail } = useSelector(state => state.ProjectReducer)
    const dispatch = useDispatch();
    const { projectId } = useParams();
    useEffect(() => {
        //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga
        dispatch({
            type: 'GET_PROJECT_DETAIL',
            projectId
        })

    }, [])
    return (
        <div className="main container-fluid mt-3">
            <HeaderMain projectDetail={projectDetail} />
            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail} />
        </div>

    )
}