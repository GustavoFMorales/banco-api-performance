const configLocal = JSON.parse(open('../config/config.local.json'));

export function pegarBaseUrl() {
    const baseUrl = __ENV.BASEURL || configLocal.baseUrl;
    return baseUrl;
}