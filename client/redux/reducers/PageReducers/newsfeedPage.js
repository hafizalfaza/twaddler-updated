import { NEWSFEED_PAGE_TYPING, POSTING_CONTENT, POSTING_SUCCESS, CONTENT_TO_POST_EMPTY } from '../../constants';

const initialNewsfeedPageState = {
    input: {
        textToPost: {text: '', textLen: 0},
        picUrl: ''
    },
    isPosting: false,
    errors: null,
}

export default function newsfeedPage(state=initialNewsfeedPageState, action){
    switch(action.type){  
        case NEWSFEED_PAGE_TYPING:
            if(action.payload.value.length<=140){
                return {
                    ...state,
                    input: {
                        ...state.input,
                        textToPost: {
                            ...state.input.textToPost,
                            text: action.payload.value,
                            textLen: action.payload.value.length,
                        }
                    },
                    errors: null,
                };
            }else{
                return {
                    ...state,
                    errors: {maxLen: 'Maximum characters reached!'}
                };
            }            

        case POSTING_CONTENT:
            return {
                ...state,
                isPosting: true,
                errors: null,
            };

        case POSTING_SUCCESS:
            return {
                ...state,
                input: {
                    textToPost: {
                        text: '',
                        textLen: 0,
                    },
                    picUrl: '',
                },
                isPosting: false,
            };
        case CONTENT_TO_POST_EMPTY:
            return {
                    ...state,
                    errors: {contentEmpty: 'Oops, nothing to post!'}
                };
            
        default: return state;
    }
}