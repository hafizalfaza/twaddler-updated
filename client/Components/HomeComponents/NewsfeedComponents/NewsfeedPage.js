import React, { Component } from 'react';
import NewsfeedList from './NewsfeedList';
import UserPostForm from './UserPostForm';

const NewsfeedPage = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-md-offset-4">
                    <UserPostForm />
                    <NewsfeedList />
                </div>
            </div>
        </div>
    )
}

export default NewsfeedPage;