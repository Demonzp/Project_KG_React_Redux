export const getUrlParams = (location) => {
    return location
        .search
        .replace('?', '')
        .split('&')
        .reduce((p, e) => {
            const a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
            {}
        );
}