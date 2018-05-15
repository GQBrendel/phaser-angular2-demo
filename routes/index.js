//---------------------------------------------- default
exports.home = function(req, res){

	res.render('index', {
		title: 'Angular',
		enviroment: req.device.enviroment,
		isMobile: 	req.device.isMobile,
		isIphone: 	req.device.isIphone,
		isIpad: 		req.device.isIpad,
		isAndroid: 	req.device.isAndroid,
		userAgent: 	req.device.ua
	});

};
//----------------------------------------------
