import React from 'react';

function Navbar(props) {
	return (
		<nav className="navbar-fixed">
			<ul className='right'>
				<li>
					<a href="/" className='brand-logo center'>Memory Game</a>
				</li>
				<li style={{ paddingRight: "20px" }}>Score: {props.score}</li>
				<li style={{ paddingLeft: "20px" }}>Top Score: {props.topScore}</li>
			</ul>
		</nav>
	)
}
export default Navbar;