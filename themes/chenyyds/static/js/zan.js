var flag = 0;
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = window.location.href.replace(parse_url, '$3/$5');

function goodplus(url, flag) {
	flag = 1; //访客点击标记
	senddata(url, flag);
	flag = 0;
}

function senddata(url, flag) {
	var Zan = AV.Object.extend('Zan');
	var query = new AV.Query('Zan');
	query.contains("url", url);
	query.find().then(function (results) {
		var vLeng = results.length;
		if (flag == 0) { //页面加载标记
			if (vLeng == 0) {
				var Zan = AV.Object.extend('Zan');
				var zan = new Zan();
				zan.set('url', url);
				zan.set('views', 0);
				zan.save().then(function (zan) {
					document.getElementById("zan_text").innerHTML = "0";
				});
			} else if (vLeng == 1) {
				var vViews = results[0].attributes.views;
				document.getElementById("zan_text").innerHTML = vViews;
			}
		} else if (flag == 1) { //访客点击标记
			var vViews = results[0].attributes.views;
			var vId = results[0].id;
			var Zan = AV.Object.createWithoutData('Zan', vId);
			Zan.set('views', vViews + 1);
			Zan.save();
			document.getElementById("zan_text").innerHTML = vViews + 1;
		}
	});
}

function remcls() {
	$('.heart').removeClass("heartAnimation");
}

function addcls() {
	$('.heart').addClass("heartAnimation");
}

jQuery(document).ready(function () {
	jQuery(".post-footer").append("<div id='zan' class='item liker'><i class='iconfont iconlike' aria-hidden='true'></i><span class='btn-zan' onclick=\"goodplus('" + url + "')\"> 喜欢 </span><span id='zan_text'></span></div>");
	senddata(url, flag);
	jQuery('body').on("click", '.liker', function () {
		jQuery('.liker').find('.iconfont').removeClass('iconlike').addClass('iconlike-fill');
	});
});