import { NEWSFEED_PAGE_TYPING, POSTING_CONTENT, POSTING_SUCCESS, POSTING_FAILURE, POSTING_ABORTED, CONTENT_TO_POST_EMPTY } from '../../constants';
import { setAuthorizationToken } from '../../../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export function onTyping(payload){
    return {
        type: NEWSFEED_PAGE_TYPING,
        payload
    }
}

export function onSubmitPost(payload){
    if(payload.content.text !== '' || payload.content.picUrl !== ''){
        return {
            type: POSTING_CONTENT,
            payload
        }
    }else{
       return {
            type: CONTENT_TO_POST_EMPTY
       } 
    }
    
}

export function postingSuccess(payload){
    return {
        type: POSTING_SUCCESS,
        payload: payload.data,
    }
}

export function postingFailure(error){
    return {
        type: POSTING_FAILURE,
        error,
    }
}

export function postingAborted(){
    return {
        type: POSTING_ABORTED,
    }
}