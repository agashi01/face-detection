import React from 'react'

const Rank = ({user,entries}) => {
	return (
		<div className="center-column">
			<div className='f3 white'>
				{user}, your current rank is...
			</div>
			<div className='f1 white'>
				{entries}
			</div>
		</div>


	);

}
export default Rank;