/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (options.method === "GET") {
        const urlReport = new URLSearchParams(options.data).toString();
        const url = options.url + '?' + urlReport;
        xhr.open(options.method, url);
        xhr.send();
    } else {
        const formData = new FormData;
        for(let key in options.data) {
            formData.append(key, options.data[key]);   
        }
        xhr.open(options.method, options.url); 
        xhr.send(formData);
    }


    xhr.addEventListener('load', () => {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                options.callback(null, xhr.response);
        } else {
               options.callback(xhr.response.error, null);
        }         
});
    xhr.addEventListener("error", (e) => {
        options.callback(xhr.statusText, null);
    });
};