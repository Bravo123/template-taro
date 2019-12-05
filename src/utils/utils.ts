/**
 * 生成 uuid
 */
export function generateUUID(): string {
  return '';
}

/**
 * 验证手机号
 * @param {string} phoneNumber
 * @return {boolean}
 */

export function isPhoneNumber(phoneNumber: string): boolean {
  const phoneReg = /^1\d{10}$/;
  return phoneReg.test(phoneNumber);
}

/**
 * 判断身份证是否正确
 * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
 * @param {string} card
 * @return {boolean} 是否正确
 */
export function isCardNo(card: string): boolean {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

/**
 * 是否是微信浏览器
 * @return {boolean}
 */
export function isWxBrowser(): boolean {
  return /micromessenger/i.test(navigator.userAgent);
}

/**
 * 是否是安卓机
 * @return {boolean}
 */
export function isAndroid(): boolean {
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
}

/**
 * 是否是ios
 * @return {boolean}}
 */
export function isIos(): boolean {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * 格式化成指定格式的时间
 * @param {Date} time 时间戳
 * @param {string} fmt 格式化的格式
 * @return {string} 格式后的时间
 */

export function timeFormat(time: number, fmt: string = 'yyyy-MM-dd hh:mm:ss'): string {
  let timeTemp = new Date(time * 1000);
  let o = {
    'M+': timeTemp.getMonth() + 1, // 月份
    'd+': timeTemp.getDate(), // 日
    'h+': timeTemp.getHours(), // 小时
    'm+': timeTemp.getMinutes(), // 分
    's+': timeTemp.getSeconds(), // 秒
    'q+': Math.floor((timeTemp.getMonth() + 3) / 3), // 季度
    S: timeTemp.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (timeTemp.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
  }
  return fmt;
}
