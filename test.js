/**
 * 截流：固定时间段内只执行一次

 * @param {*} func 
 * @param {*} wait 等待时间
 * @param {leading, trailing} options 
 * @returns 
 */
function throttle(func, wait, options={}) {
	let timeout
	let previous = 0;
	let self;
	let args;

	function later() {
		previous = +new Date();
		timeout = null;
		func.apply(self, args);
	}
	const throttled = function() {
		self = this;
		args = arguments;
		const now = +new Date();

		if (!previous && options.leading === false) previous = now;

		// 用于停止触发后，判断trailing的触发事件；
		const remain = wait - ( now - previous);

		if (remain <=0 || remain > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(self, args)
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remain);
		}
	}

	return throttled
}