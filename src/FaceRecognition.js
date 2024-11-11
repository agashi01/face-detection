/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './faceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	const img = imageUrl && (<img
		// onError={(e) => { e.target.style.display = 'none'; }}
		alt='Enter an url'
		id='input-image'
		width='500'
		height='400'
		src={imageUrl} />);
		
	return (
		<div className='center-column ma'>
			<div style={{ position: 'relative' }}>
				{img}
				{box.map(info => {
					return <div
						className='bounding-box'
						style={{ top: info.topRow, bottom: info.bottomRow, right: info.rightCol, left: info.leftCol }}>
					</div>
				})}
			</div>
		</div>
	)
}

export default FaceRecognition;