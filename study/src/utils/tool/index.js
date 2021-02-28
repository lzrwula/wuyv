/* eslint-disable no-undef */

function parseTime(time) {
  const tempDate = new Date(time);
  return `${tempDate.getFullYear()}年${tempDate.getMonth() + 1}月${tempDate.getDate()}日${tempDate.getHours()}时`;
}

function showToast(title, duration = 2000, isSuccess = false) {
  let r = title;
  if (typeof (title) !== 'string') {
    r = title && (title.message || title.response);
  }
  // eslint d
  if (!isSuccess) {
    uni.showModal({
      title: '提示',
      content: r,
      showCancel: false,
    });
  } else {
    uni.showToast({
      duration,
      title: r,
      icon: 'none',
    });
  }
}

function braceCatch(callback) {
  return function test(...as) {
    let [context, args] = [this, as];
    try {
      const result = callback.apply(context, args);
      context = args = null;
      return result;
    } catch (err) {
      showToast(err && err.message);
    }
    return false;
  };
}

export default {
  parseTime,
  braceCatch,
  showToast,
};
