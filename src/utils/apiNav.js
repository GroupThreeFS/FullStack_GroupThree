exports.generateUrl = (endpoint, dbType, id) => {
    let baseUrl = `http://localhost:3000/api/${endpoint}`;
    if (id && id !== 'all') {
        baseUrl += `/${id}`;
    }
    return `${baseUrl}?db=${dbType}`;
};