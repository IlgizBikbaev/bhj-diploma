/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {url, data, method, callback}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (options.method == "GET") {
        xhr.open('GET', 'options.url?mail=options.data.mail&password=options.data.password');
        xhr.send();
    } else {
        formData = new FormData;
        formData.append('mail', 'options.data.mail');
        formData.append('password', 'options.data.password');

        xhr.open('POST', 'options.url');
        xhr.send(formData);
    }

    xhr.addEventListener('readystatechange', () => {
    try {
            if (xhr.readyState == xhr.DONE && xhr.status === 200) {
                options.callback(xhr.response.error, xhr.response);
            }
        } catch (error) {
        options.callback(xhr.response.error);
    }
})
};