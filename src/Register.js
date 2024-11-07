import React from 'react'

class register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: '',
			error: ''
		}

	}

	onNameChange = (event) => {
		this.setState({ registerName: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ registerPassword: event.target.value })
	}

	onEmailChange = (event) => {
		this.setState({ registerEmail: event.target.value })
	}

	onSubmitRegister = () => {
		if (!this.state.registerPassword.length) {
			this.setState({ error: 'Please enter your password' })
		} else if (this.state.registerPassword.length < 8) {
			this.setState({ error: 'Your password must have 8 or more characters' })
		} else if (!this.state.registerEmail.length) {
			this.setState({ error: 'Please enter your email' })
		} else if (!this.state.registerName.length) {
			this.setState({ error: 'Please enter your name' })
		} else {
			fetch('http://localhost:3000/register', {
				method: 'post',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					name: this.state.registerName,
					email: this.state.registerEmail,
					password: this.state.registerPassword
				})
			})
				.then(response => response.json())
				.then(data => {
					if (data) {
						this.setState({
							registerName: '',
							registerEmail: '',
							registerPassword: '',
							error: ''
						})
						this.propsloadUser(data)
						this.props.onRouteChange('home')
					}
				})
				.catch(err => {
					console.log(err)
					if (err.response) {
						if (err.response.data === 'Email is already in use') {
							this.setState({ error: err.response.data })
						} else {
							this.setState({ error: err.response.data })

						}
					}

				})
		}

	}
	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<form className="measure center " onSubmit={this.onSubmitRegister} >
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f4 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="name"
									name="name"
									id="name"
									onChange={this.onNameChange} />
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
								/>

							</div>

						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register" />
						</div>
						{this.state.error ? <p className='db fw6 lh-copy f6'>{this.state.error}</p> : null}
						<div className="lh-copy mt3">
						</div>
					</form>
				</main>
			</article>

		);
	}

}
export default register;