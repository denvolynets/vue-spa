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

export const idGenerate = function(list) {
	const id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
	
	if (!list) throw Error('idGenerate argument "list" is empty');
	
	if (list.find(item => item.id === id)) {
		this.idGenerate();
		return;
	}
	
	return id;
};

export const numberGenerate = function(list, typeAdd) {
	const maximum = 999999;
	const minimum = 100000;
	const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	const invoiceNumber = `INV-${randomNumber}`;
	
	if (!list) throw Error('idGenerate argument "list" is empty');
	if (!typeAdd) return;
	
	if (list.find(item => item.number === invoiceNumber)) {
		this.numberGenerate();
		return;
	}
	
	return invoiceNumber;
};

export const invoicesToastMessage = function(word = 'added', number = 'XXX-XXX-XXX') {
	this.$toast.success(`The invoice № ${number} has been successfully <b>${word}</b>!`, 'Success');
};
