import React from 'react'

const Btn = ({color, btnID, btnText, onClick}) => {
	return (
      <button className="button" id={btnID} onClick={onClick} style={color}>{btnText}</button>
	)
}

export default Btn
