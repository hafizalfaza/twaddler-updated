import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../../tools/dateConverter'; 

const PostContainer = (props) => {
    const {content, postedBy, postedAt} = props.post;
    const commentIcon = require('../../../../public/assets/icons/comment.png');
    const loveOnIcon =  require('../../../../public/assets/icons/love-on.png');
    const loveOffIcon =  require('../../../../public/assets/icons/love-off.png');
    return (
        <div>
            <div className="media well" style={{marginBottom: 0}}>
                <div className="media-left">
                    <Link to="/" style={ { textDecoration: 'none' } }><img src={postedBy.profilePic} className="media-object img-rounded" style={ { width: 50 } }/></Link>
                </div>
                <div className="media-body">
                    <h4 className="media-heading"><Link to= "/" style={ { fontSize: 15, fontWeight: 'bold' } }>{postedBy.username}</Link>&nbsp;<span style={ { fontSize: 13, color: 'gray' } }>{postedBy.fullName}</span>&nbsp;&bull;&nbsp;
                    <span style={ { fontSize: 12, color: 'gray' } }>{convertDate(postedAt)}</span>
                    </h4>
                    <p style={ { wordBreak: 'break-all' } }>{content.text}</p>
                    <div className="pull-left">
                    <span ><img src={commentIcon} style={{ width: 14 }} /></span>&nbsp;<span>commentsCount</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={loveOffIcon} style={{ width: 11 }} /><span style={ { fontSize: 12 } }>number of likes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostContainer;