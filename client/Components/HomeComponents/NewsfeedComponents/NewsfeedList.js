import React, { Components } from 'react';
import PostContainer from './PostContainer';
import { connect } from 'react-redux';

const NewsfeedList = (props) =>{
    if(props.newsfeedPage.posts){
        const initialPosts = props.newsfeedPage.posts.map(post =>
            <PostContainer key={post._id} post={post}/>
        )
        return (        
            <div>
                {initialPosts}
            </div>
        )
    }else{
        return null;
    }
    
}

function mapStateToProps(state){
    return {
        newsfeedPage: state.newsfeedPage
    }
}

export default connect(mapStateToProps)(NewsfeedList);