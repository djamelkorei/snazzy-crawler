function normalizeURL(urlString) {
    const urlObjg = new URL(urlString);
    const hostPath = `${urlObjg.hostname}${urlObjg.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath
}

module.exports = {
    normalizeURL
}; 