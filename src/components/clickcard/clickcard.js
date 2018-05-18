import React from 'react';
import './clickcard.css';

const ClickCard = props => (
	<div
		role="img"
		aria-label="click item"
		onClick={() => props.handleClick(props.id)}
		style={{ backgroundImage: 'url("${props.image}")' }}
		className={'click-item${props.shake ? " shake" : ""}'}
	/>
);

export default ClickCard
