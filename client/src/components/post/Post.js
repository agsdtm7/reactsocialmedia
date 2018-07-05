import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {
    render() {
        return (
            <div>
                <h1>Post</h1>
            </div>
        )
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    props: state.post
});
export default connect(mapStateToProps, { getPost })(Post);