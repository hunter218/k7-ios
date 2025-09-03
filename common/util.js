function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
	
function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

var arrayUtils = {
	remove: function(array, val) {
		var index = array.indexOf(val);
		if (index > -1) {
			array.splice(index, 1);
		}
	}
};

var formatUtils = {
	lotteryFormatter: function(lottery) {
		switch(lottery){
			case 'SGFT':return 'SG飞艇';break
			case 'XYFT':return '幸运飞艇';break
			case 'BJSC':return '北京赛车';break
			case 'XYSSC':return '幸运时时彩';break
			case 'CQHLSX':return '重庆欢乐生肖';break
			case 'AZXYS':return '澳洲幸运10';break
			case 'JSSSC':return '极速时时彩';break
			case 'AZXYW':return '澳洲幸运5';break
			case 'JSFT':return '极速飞艇';break
			case 'JSSC':return '极速赛车';break
			default: return ''
		}
	}
};

module.exports = {
	getDate: getDate,
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	arrayUtils: arrayUtils,
	formatUtils: formatUtils,
}
