import myRequest from './base.js'

// async function getAllBets (payload) {
// 	let res = await myRequest.sendRequest('api/home', payload)
// 	return res.data.results
// }

async function getPeriod (payload) {
	let res = await myRequest.sendRequest('api/period', payload)
	return res.data.results
}

async function getBets (payload) {
	let res = await myRequest.sendRequest('api/home', payload)
	return res.data.results
}

async function getCaptcha () {
	let res = await myRequest.sendRequest('api/captcha', {})
	return res.data.results
}

async function getNotice () {
	let res = await myRequest.sendRequest('api/notice', {})
	return res.data.results
}

async function login (payload) {
	let res = await myRequest.sendRequest('api/login', {'method':'post', 'data': payload})
	return res.data
}

async function logout (headers) {
	let res = await myRequest.sendRequest('api/logout', {'headers': headers})
	return res.data
}

async function getMyQuota (headers) {
	let res = await myRequest.sendRequest('api/quota', {'headers': headers})
	return res.data.results
}

async function getMyQuotaLiuhe (headers) {
	let res = await myRequest.sendRequest('api/quota-liuhe', {'headers': headers})
	return res.data.results
}
async function getMyInfo (payload, headers) {
	let res = await myRequest.sendRequest('api/my', {'data': payload, 'headers': headers})
	return res.data.results
}

async function getSettled (headers) {
	let res = await myRequest.sendRequest('api/settled', {'headers': headers})
	return res.data.results
}

async function getUnsettled (headers) {
	let res = await myRequest.sendRequest('api/unsettled', {'headers': headers})
	return res.data.results
}

async function getFinance (headers) {
	let res = await myRequest.sendRequest('api/finance-log', {'headers': headers})
	return res.data.results
}

async function getAgent (payload, headers) {
	let res = await myRequest.sendRequest('api/agent', {'data': payload, 'headers': headers})
	return res.data.results
}

async function getHistory (payload, headers) {
	let res = await myRequest.sendRequest('api/history', {'data': payload, 'headers': headers})
	return res.data.results
}

async function getDresult (payload, headers) {
	let res = await myRequest.sendRequest('api/dresult',  {'data': payload, 'headers': headers})
	return res.data.results
}

async function getStat (payload, headers) {
	let res = await myRequest.sendRequest('api/stat',  {'data': payload, 'headers': headers})
	return res.data.results
}

async function getLm (payload, headers) {
	let res = await myRequest.sendRequest('api/lm',  {'data': payload, 'headers': headers})
	return res.data.results
}

async function password (payload, headers) {
	let res = await myRequest.sendRequest('api/password', {'method':'put', 'data': payload, 'headers': headers})
	return res.data
}

async function addAgent (payload, headers) {
	let res = await myRequest.sendRequest('api/add-agent', {'method':'post', 'data': payload, 'headers': headers})
	return res.data
}

async function addBankCard (payload, headers) {
	let res = await myRequest.sendRequest('api/add-bank-card', {'method':'post', 'data': payload, 'headers': headers})
	return res.data
}

async function setDefaultCard (payload, headers) {
	let res = await myRequest.sendRequest('api/set-default-card', {'method':'put', 'data': payload, 'headers': headers})
	return res.data
}

async function wager (payload, headers) {
	let res = await myRequest.sendRequest('api/wager', {'method':'post', 'data': payload, 'headers': headers})
	return res.data
}

async function doEntry(payload, headers) {
	let res = await myRequest.sendRequest('api/entry', {'method':'post', 'data': payload, 'headers': headers})
	return res.data
}

async function getOrderDetail (payload, headers) {
	let res = await myRequest.sendRequest('api/order-detail', {'method':'get', 'data': payload, 'headers': headers})
	return res.data.results
}

async function getUserOrder (payload, headers) {
	let res = await myRequest.sendRequest('api/user-order', {'method':'get', 'data': payload, 'headers': headers})
	return res.data.results
}

async function getBankCards (headers) {
	let res = await myRequest.sendRequest('api/my-bank-cards', {'method':'get', 'headers': headers})
	return res.data.results
}

async function getChatHistory (payload, headers) {
	let res = await myRequest.sendRequest('api/chat-history', {'data': payload, 'headers': headers})
	return res.data.results
}

async function getSysBankCards (headers) {
	let res = await myRequest.sendRequest('api/sysbankcards', {'headers': headers})
	return res.data.results
}

async function getPaymentcode (headers) {
	let res = await myRequest.sendRequest('api/paymentcode', {'headers': headers})
	return res.data.results
}

async function cofferOut (payload, headers) {
	let res = await myRequest.sendRequest('api/coffer-out', {'method':'post', 'data': payload, 'headers': headers})
	return res.data
}

async function cofferIn (payload, headers) {
	let res = await myRequest.sendRequest('api/coffer-in', {'method':'post', 'data': payload, 'headers': headers})
	return res.data
}

async function getLotteryState (headers) {
	let res = await myRequest.sendRequest('api/get-lottery-state', {'headers': headers})
	return res.data.results
}

async function getInviteCode (headers) {
	let res = await myRequest.sendRequest('api/get-invite-code', {'headers': headers})
	return res.data.results
}

async function setInviteCode (payload, headers) {
	let res = await myRequest.sendRequest('api/set-invite-code', {'method':'put', 'data': payload, 'headers': headers})
	return res.data
}

async function delInviteCode (headers) {
	let res = await myRequest.sendRequest('api/del-invite-code', {'method':'post', 'headers': headers})
	return res.data
}

async function regist (payload) {
	let res = await myRequest.sendRequest('api/regist', {'method':'post', 'data': payload})
	return res.data
}

module.exports = {
	getPeriod,
	getBets,
	getCaptcha,
	getNotice,
	login,
	logout,
	password,
	getMyQuota,
	getMyInfo,
	wager,
	getSettled,
	getFinance,
	getAgent,
	getUnsettled,
	getHistory,
	getDresult,
	getStat,
	getLm,
	doEntry,
	addAgent,
	getOrderDetail,
	getUserOrder,
	addBankCard,
	getBankCards,
	setDefaultCard,
	getChatHistory,
	getSysBankCards,
	getPaymentcode,
	cofferOut,
	cofferIn,
	getLotteryState,
	getMyQuotaLiuhe,
	setInviteCode,
	getInviteCode,
	delInviteCode,
	regist,
}