/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';
   try {
       if (options.method === "GET") {
           const urlReport = new URLSearchParams(options.data).toString();
           const url = options.url + '?' + urlReport;
           xhr.open(options.method, url);
           xhr.send();
       } else {
           for (let key in options.data) {
               formData.append(key, options.data[key]);
           }
           xhr.open(options.method, options.url);
           xhr.send(formData);
       }
    } catch (e) {
        callback(e);
    }


    xhr.addEventListener('load', () => {
        options.callback(null, xhr.response);
    });

    xhr.addEventListener("error", () => {
        options.callback(xhr.statusText, null);
    });
};