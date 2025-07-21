const configLocal = JSON.parse(open('../config/config.local.json'));

export function baseUrl () {
    return __ENV.BASE_URL || configLocal.BASE_URL;
}