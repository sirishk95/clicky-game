import React from 'react';
import './clickcard.css';

const ClickCard = props => (
	<div
		role="img"
		aria-label="card"
		onClick={() => props.handleClick(props.id)}
		style={{ backgroundImage: `url("${props.image}")` }}
		className={`card${props.shake ? " shake" : ""}`}
	/>
);

export default ClickCard
