const Sysop = ["enter the", "ids of your", "sysops"];
let sysop_status = false;


let check = function(user_id) {
	for (let x = 0; x < Sysop.length; x++) {
		if (user_id === Sysop[x]) {
			sysop_status = true;
			break;
		}
		else { sysop_status = false; }
	}
	return sysop_status;
}


exports.check = check;
