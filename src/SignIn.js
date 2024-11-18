import React from 'react';
import axios from 'axios';

class signIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })

    }
    onSubmitSignIn = (e) => {
        e.preventDefault();
        console.log(this.state);
    
        if (!this.state.password.length) {
            this.setState({ error: 'Please type your password' });
        } else if (this.state.password.length < 8) {
            this.setState({ error: 'Your password must have 8 or more characters' });
        } else {
            if (!this.state.email.length) {
                this.setState({ error: 'Please type your email' });
            } else {
                this.setState({error:''})
                axios.post('https://face-recognition-backend-agashi01.onrender.com/signin', {
                    email: this.state.email,
                    password: this.state.password
                })
                .then(response => {
                    const data = response.data;
                    if (data.id) {
                        this.props.loadUser(data);
                        this.props.onRouteChange('home');
                    }
                })
                .catch(err => {
                    console.log(err, 'hi');
                    
                    if (err.response) {
                        const errorMessage = err.response.data;
                        
                        if (errorMessage === "This email do not have a registered account !") {
                            this.setState({ error: 'This email is not associated with a registered account.' });
                        } else if (errorMessage === 'Wrong credentials') {
                            this.setState({ error: 'Wrong credentials' });
                        } else {
                            this.setState({ error: 'Unable to sign in' });
                        }
                    } else {
                        this.setState({ error: 'An error occurred during sign in' });
                    }
                });
            }
        }
    };

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure center " onSubmit={this.onSubmitSignIn}
                    >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign in </legend>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email"
                                    id="email-address"
                                    autoComplete='email'
                                    required />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete='current-password' />
                            </div>
                            {this.state.error ? <p className='db fw6 lh-copy f6'>{this.state.error}</p> : null}
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign In" />
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </form>
                </main>
            </article>

        );
    };
}
export default signIn