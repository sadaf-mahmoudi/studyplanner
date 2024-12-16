const weekdays = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']


function getToday() {
	return weekdays[new Date().getDay()]
}

export { getToday }