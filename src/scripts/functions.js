import { DashSymbol } from './constants';
export const formatDate = function(date) {
	date = new Date(date || '');

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let dt = date.getDate();

	if (dt < 10) dt = '0' + dt;
	if (month < 10) month = '0' + month;

	return dt + DashSymbol + month + DashSymbol + year;
};

export const pickerDate = function(date) {
	date = date.split(DashSymbol).map((x) => parseInt(x, 10));

	return new Date(date[2], date[1] - 1, date[0]);
};