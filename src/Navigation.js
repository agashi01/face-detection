import React from 'react'

const Navigation = ({ removeUser, onRouteChange, route }) => {
	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
			{route === 'home'
				?
				<p onClick={() => {
					removeUser()	
					onRouteChange('signIn')
				}} className='f3 link dim black underline pa3 pointer'>Sign Out</p>

				: (
					<>
						<p onClick={() => onRouteChange('signIn')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
						<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
					</>
				)
			}
		</nav>

	);
}
export default Navigation;