/**
   * 对象序列化
   *
   * @param {any} v 参数对象
   * {
    user_name: 'xiaoming',
    age: 20,
    id: ''
    }
   * @returns user_name=xiaoming&age=20
   */

export const queryStringify = query => {
  if (!query) return "";
  const obj = JSON.parse(JSON.stringify(query));
  // 过滤空数据
  for (const k in obj) {
    // 空且不是0
    !obj[k] && !["0", 0].includes(obj[k]) ? delete obj[k] : true;
  }
  const r = Object.values(obj).reduce((a, b, i) => `${a}${Object.keys(obj)[i]}=${b}&`, "");
  return `?${r.substring(0, r.length - 1)}`;
};

export const local = (key, value) => {
  if (value) {
    return window.localStorage.setItem(key, value);
  }
  return window.localStorage.getItem(key);
};

export const removeLocal = key => {
  if (key) {
    return window.localStorage.removeItem(key);
  }
  return window.localStorage.clear();
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return function(element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return function(element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
})();
