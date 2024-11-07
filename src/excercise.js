import React from 'react';

class signIn extends React.component {
    constructor(props) {
        super(props)
        this.state= {
            email: '',
            password: ''
        }
    }

    let list=[{
        email: '',
        password: '',
    }]

    onPasswordChange2=(event)=>{
        list[0].password=event.target.value
    }

    onEmailChange2=(event)=>{
        list[0].email=event.target.value
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })

        })
        .then(response=>response.json)
        .then(data=>{
            if(data.password===list[0].password && data.email===list[0].email){
                this.props.loadUser(data)
                this.props.onRouteChange('home')
            }
        })


    }
    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure center ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign in </legend>
                            {/* <div className="mt3"> */}
                        {/* // <label className="db fw6 lh-copy f6" for="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="name"
                                    name="name"
                                    id="name" />
                            </div> */}
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>

                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
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