import { NEWSFEED_PAGE_TYPING, 
         POSTING_CONTENT, 
         POSTING_SUCCESS, 
         CONTENT_TO_POST_EMPTY, 
         FETCHING_INITIAL_POSTS,
         INITIAL_POSTS_SUCCESS,
         INITIAL_POSTS_FAILURE,
         INITIAL_POSTS_ABORTED,
         FETCHING_RECENT_POSTS,
         RECENT_POSTS_SUCCESS,
         RECENT_POSTS_FAILURE,
         RECENT_POSTS_ABORTED,
         REVEAL_COLLECTED_POSTS} from '../../constants';

const initialNewsfeedPageState = {
    input: {
        textToPost: {text: '', textLen: 0},
        picUrl: ''
    },
    isPosting: false,
    isForcingRecentPosts: false,
    errors: null,
    isFetchingInitialPosts: false,
    posts: null,
    collectedPosts: null,
    error: null,
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
                isForcingRecentPosts: true,
            };

        case POSTING_SUCCESS:
            return {
                ...state,
            };
        case CONTENT_TO_POST_EMPTY:
            return {
                    ...state,
                    errors: {contentEmpty: 'Oops, nothing to post!'}
                };
        case FETCHING_INITIAL_POSTS:
            return {
                ...state,
                isFetchingInitialPosts: true,
            }
        case INITIAL_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.initialPosts,
                isFetchingInitialPosts: false,
            }
        case INITIAL_POSTS_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case FETCHING_RECENT_POSTS:
            return state;
            
        case RECENT_POSTS_SUCCESS:
            if(action.payload.recentPosts[0]){
                if(state.isPosting){
                    return {
                        ...state,
                        collectedPosts: null,
                        posts: [...action.payload.recentPosts, ...state.posts],
                        isPosting: false,
                        input: {
                            textToPost: {
                                text: '',
                                textLen: 0,
                            },
                            picUrl: '',
                        },
                    }
                }else{
                    return {
                        ...state,
                        collectedPosts: action.payload.recentPosts,
                        isFetchingRecentPosts: false,
                    }
                }
                
            }else{
                return state;
            }
        case RECENT_POSTS_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case REVEAL_COLLECTED_POSTS:
            return {
                ...state,
                collectedPosts: null,
                posts: [...state.collectedPosts, ...state.posts]
            }

        default: return state;
    }
}