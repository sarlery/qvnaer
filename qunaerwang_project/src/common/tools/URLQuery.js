/**
 * url query string 解析函数，返回一个对象
 * @param {string} url 
 */
export function URLQuery(url){
    var u = new URL(url),
        queryString = u.search.replace(/^\?/,""),
        object = {},
        arr = queryString.split("&");
    
    arr.forEach(item => {
        var res = item.split("="),
            key = decodeURIComponent(res[0]),
            value = decodeURIComponent(res[1]);
        object[key] = value;
    });

    return object;
}

/**
 * 序列化一个对象
 * @param {Object} object 
 */
export function serialize(object){
    let result = "";
    for(let p in object){
        result = result + p + "=" + object[p] + "&";
    }
    return result.replace(/&$/,"");
}