/**
 * 读取header key
 * @param {Array} header 
 * @param {String} key 
 * @returns 
 */
function readHeaer(header, key) {
    const targetHeader = header.find(item => item.key === key);
    return targetHeader ? targetHeader.value.trim() : null;
}

/**
 * 
 * @param {Array} header 
 * @param {String} key 
 * @param {String} value 
 * @returns 
 */
function setHeader(header, key, value) {
    const targetHeader = header.find(item => item.key === key);
    
    if (targetHeader) {
        targetHeader.value = value;
    } else {
        header.push({
            key,
            value,
        })
    }
    return true;
}


module.exports = {
    readHeaer,
    setHeader,
}