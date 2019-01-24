const sysop = ["221011523546513408", "345388822214737920", "269286028274171905"];
let isSys = false, ofSys = false;



let isSysop = function(sender) {
	for (let x = 0; x < sysop.length; x++) {
		if (sender === sysop[x]) {
			isSys = true;
			break;
		}
		else isSys = false;
	}
	return isSys
}


let ofSysop = function(target) {
	for (let y = 0; y < sysop.length; y++) {

		if (target === sysop[y]) {
			ofSys = true;
			break;
		}
		else ofSys = false;
	}
	return ofSys;
}

exports.isSysop = isSysop;

if (ofSysop)
	exports.ofSysop = ofSysop;