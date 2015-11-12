'use strict';

module.exports = function (t, a) {
	var el  = document.createElement('div'), result;

	el.innerHTML = 'marko <strong>marek fura zegarek</strong> zagalo <span>razdwa</span>';
	result = t(el, document);
	a(result.nodeName, '#document-fragment');
	a(result.childNodes.length, 4);
	a(result.childNodes[0].data, 'marko ');
	a(result.childNodes[1].nodeName, 'STRONG');
	a(result.childNodes[1].childNodes.length, 1);
	a(result.childNodes[1].childNodes[0].data, 'marek fura zegarek');
	a(result.childNodes[2].data, ' zagalo ');
	a(result.childNodes[3].nodeName, 'SPAN');
	a(result.childNodes[3].childNodes.length, 1);
	a(result.childNodes[3].childNodes[0].data, 'razdwa');

	el.innerHTML = '<p>marko <strong>marek fura zegarek</strong> zagalo <span>razdwa</span></p>' +
		'<p>filo</p>';
	result = t(el, document);
	a(result.nodeName, '#document-fragment');
	a(result.childNodes.length, 4);
	a(result.childNodes[0].data, 'marko ');
	a(result.childNodes[1].nodeName, 'STRONG');
	a(result.childNodes[1].childNodes.length, 1);
	a(result.childNodes[1].childNodes[0].data, 'marek fura zegarek');
	a(result.childNodes[2].data, ' zagalo ');
	a(result.childNodes[3].nodeName, 'SPAN');
	a(result.childNodes[3].childNodes.length, 1);
	a(result.childNodes[3].childNodes[0].data, 'razdwa');
};
