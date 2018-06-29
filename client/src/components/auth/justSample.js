// This is only for notes / samples
// import React, { Component } from 'react'

// class Register extends Component {
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }

// export default Register;

// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addExperience } from '../../actions/profileActions';

// class AddExperience extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             company: '',
//             title: '',
//             location: '',
//             from: '',
//             to: '',
//             current: false,
//             description: '',
//             errors: {},
//             disabled: false
//         };

//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.onCheck = this.onCheck.bind(this);
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.errors) {
//             this.setState({ errors: nextProps.errors });
//         }
//     }

//     onSubmit(e) {
//         e.preventDefault();
//         console.log('test');
//         const expData = {
//             company: this.state.company,
//             title: this.state.title,
//             location: this.state.location,
//             from: this.state.from,
//             to: this.state.to,
//             current: this.state.current,
//             description: this.state.description
//         };

//         this.props.addExperience(expData, this.props.history);
//     }

//     onChange(e) {
//         this.setState({ [e.target.name]: e.target.value });
//     }

//     onCheck(e) {
//         this.setState({
//             disabled: !this.state.disabled,
//             current: !this.state.current
//         });
//     }

//     render() {
//         const { errors } = this.state;

//         return (
//             <div className="add-experience">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-8 m-auto">
//                             <Link to="/dashboard" className="btn btn-light">Go Back</Link>
//                             <h1 className="display-4 text-center">Add Experience</h1>
//                             <p className="lead text-center">Add any job or position that you have had in the past or current</p>
//                             <small className="d-block pb-3">* = required fields</small>
//                             <form onSubmit={this.onSubmit}>
//                                 <TextFieldGroup
//                                     placeholder="* Company"
//                                     name="company"
//                                     value={this.state.company}
//                                     onChange={this.onChange}
//                                     error={errors.company}
//                                 />
//                                 <TextFieldGroup
//                                     placeholder="* Job Title"
//                                     name="title"
//                                     value={this.state.title}
//                                     onChange={this.onChange}
//                                     error={errors.title}
//                                 />
//                                 <TextFieldGroup
//                                     placeholder="Location"
//                                     name="location"
//                                     value={this.state.location}
//                                     onChange={this.onChange}
//                                     error={errors.location}
//                                 />
//                                 <h6>From Date</h6>
//                                 <TextFieldGroup
//                                     name="from"
//                                     type="date"
//                                     value={this.state.from}
//                                     onChange={this.onChange}
//                                     error={errors.from}
//                                 />
//                                 <h6>To Date</h6>
//                                 <TextFieldGroup
//                                     name="to"
//                                     type="date"
//                                     value={this.state.to}
//                                     onChange={this.onChange}
//                                     error={errors.to}
//                                     disabled={this.state.disabled ? 'disabled' : ''}
//                                 />
//                                 <div className="form-check mb-4">
//                                     <input
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         name="current"
//                                         value={this.state.current}
//                                         checked={this.state.current}
//                                         onChange={this.onCheck}
//                                         id="current"
//                                     />
//                                     <label htmlFor="current" className="form-check-label">
//                                         Current Job
//                                     </label>
//                                 </div>
//                                 <TextAreaFieldGroup
//                                     name="Job Description"
//                                     type="description"
//                                     value={this.state.description}
//                                     onChange={this.onChange}
//                                     error={errors.description}
//                                     info="Tell us about the position"
//                                 />
//                                 <input
//                                     type="text"
//                                     value="Submit"
//                                     className="btn btn-info btn-block mt-4"
//                                 />
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// AddExperience.propTypes = {
//     addExperience: PropTypes.func.isRequired,
//     profile: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     profile: state.profile,
//     errors: state.errors
// });
// export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
// //export default connect(mapStateToProps)(withRouter(AddExperience));



// FROM PROFILEITEM
// import React, { Component } from 'react'
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import isEmpty from '../../validation/is-empty';

// class ProfileItem extends Component {
//     render() {
//         const { profile } = this.props;

//         return (
//             <div className="card card-body bg-light mb-3">
//                 <div className="row">
//                     <div className="col-2">
//                         <img src={profile.user.avatar} alt="" className="rounded-circle" />
//                     </div>
//                     <div className="col-lg-6 col-md-4 col-8">
//                         <h3>{profile.user.name}</h3>
//                         <p>
//                             {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
//                         </p>
//                         <p>
//                             {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
//                         </p>
//                         <Link to={`/profile/${profile.handles}`} className="btn btn-info" >View Profile</Link>
//                     </div>
//                     <div className="col-md-4 d-none d-md-block">
//                         <h4>Skill Set</h4>
//                         <ul className="list-group">
//                             {profile.skills.slice(0, 4).map((skill, index) => (
//                                 <li key={index} className="list-group-item">
//                                     <i className="fa fa-check pr-1" />
//                                     {skill}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// ProfileItem.propTypes = {
//     profile: PropTypes.object.isRequired
// }

// export default ProfileItem;



// FROM PROFILE.JS
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Spinner from '../common/Spinner';
// import { getProfiles } from '../../actions/profileActions';
// import ProfileItem from './ProfileItem';

// class Profiles extends Component {
//     componentDidMount() {
//         this.props.getProfiles();
//     }

//     render() {
//         const { profiles, loading } = this.props.profile;
//         let profileItems;

//         if (profiles === null || loading) {
//             profileItems = <Spinner />;
//             console.log('empty');
//         } else {
//             if (profiles.length > 0) {
//                 console.log('NOT empty');
//                 profileItems = profiles.map(profile => (
//                     <ProfileItem key={profile._id} profile={profile} />
//                 ));
//             } else {
//                 profileItems = <h4>No profiles found...</h4>
//             }
//         }

//         return (
//             <div className="profiles">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <h1 className="display-4 text-center">
//                                 Developer Profiles
//                     </h1>
//                             <p className="lead text-center">
//                                 Browse and connect with developers
//                     </p>
//                             {profileItems}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// Profiles.propTypes = {
//     getProfiles: PropTypes.func.isRequired,
//     profile: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     profile: state.profile
// });

// export default connect(mapStateToProps, { getProfiles })(Profiles);