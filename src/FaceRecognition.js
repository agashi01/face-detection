/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './faceRecognition.css';

const FaceRecognition = ({ ImageUrl, box }) => {
	return (
		<div className='center-column ma'>
			<div className='absolute mt2'>
				<img alt='Enter an url' id='input-image'  width="500" src={ImageUrl}></img>
				<div className='bounding-box' style={{ top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol }}></div>
			</div>
		</div>
	)
}

export default FaceRecognition;