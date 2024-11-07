import React, { useRef } from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	const tiltRef = useRef(null); // Create a ref for the Tilt component

	return (
		<div className='ma4 mt0'>
			<Tilt
				ref={tiltRef} // Attach the ref here
				className='Tilt br2 shadow-2'
				options={{ max: 55 }}
				style={{ height: 200, width: 200 }}
			>
				<div className="Tilt-inner pa3">
					<img
						style={{ paddingTop: '30px', paddingLeft: '30px' }}
						alt='logo'
						src={brain}
					/>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;