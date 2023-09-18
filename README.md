# express_server
## Задача
### Express: Эхо-сервер
Задача — создать приложение на библиотеке Express, отвечающее на запросы GET и POST по маршруту /,приложение отвечает сообщением типа string из запроса.</br>
### GET запрос</br>
Сервер прочитывает параметр сообщения запроса и отправляет ответ в JSON, содержащий значение отраженного сообщения со статусом 200.</br>
Пример строки запроса: ?message=hello должна быть отражена как {"message": "hello"}. Если задана пустая строка ?message= , то она действительна и должна отображаться обычным образом.</br>
Если query параметр "message" отсутствует, то сервер должен отправить в ответ JSON  {"error": "'message' was not provided"}, со статус кодом 422.</br>
Если query параметр "message" присутствует, но тип параметра не string, то сервер должен отправить в ответ JSON  {"error": "'message' was not a string"}, со статус кодом 422.</br>
### POST /</br>
Сервер анализирует тело запроса в JSON и отображать ответ, содержащий значение "message" запроса. Ответ JSON в таком же формате, что и GET выше: {"message": "some message"}. Установите статус 200 для ответа, чтобы указать, что запрос одобрен.Если задана пустая строка ("message": ""), то она действительна и должна быть отображена.</br>
Если body параметр "message" отсутствует или имеет тип не string, то сервер должен отправить в ответ JSON  аналогичный таким же ошибкам в GET, со статус кодом 422.</br>
Для любого метода запрос по-прежнему действителен, если в query или body JSON присутствуют дополнительные параметры или ключи. Их можно игнорировать и отображать сообщение как обычно.</br>
## Управление сервером
**Запуск сервера:**
```
npm run src/server.js
```
**Запуск тестов сервера:**
```
npm run test
```
**GET запрос на сервер:**
```
curl http://localhost:8000?message="(сообщение)"
```
**POST запрос на сервер:**
```
curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{"message":"сообщение"}' \
 'http://localhost:8000'
```
## Утилита npx
Утилита npx связана с npm, добавлена в версии 5.2. Одной из её возможностей является запуск исполняемых файлов, входящих в состав npm-пакетов. 
Установка npx:
```
npm install -g npx
```
Также можно проверить, присутствует ли она:
```
which npx
```
Утилита даёт разработчику массу возможностей:</br>
* Использование npx для упрощения запуска локальных команд</br>
Применение команды вида _npx commandname_ приводит к автоматическому поиску нужного файла в папке проекта node_modules. Это избавляет от необходимости знания точного пути к подобному файлу. Так же это делает ненужной глобальную установку пакета с обеспечением доступа к нему из любого места файловой системы благодаря использованию системной переменной _PATH_.
* Выполнение утилит без необходимости их установки</br>
В npx имеется ещё одна возможность, благодаря которой утилиты можно запускать без их предварительной установки. Полезно это, в основном, по следующим причинам:
не требуется установка утилит,и можно запускать разные версии одних и тех же утилит, указывая нужную версию с помощью конструкции _@version_.</br> Пример команды:
```
npx vue create my-vue-app
```
* Запуск JavaScript-кода с использованием различных версий Node.js</br>
Для того чтобы запускать некий код с использованием разных версий Node.js, можно, с использованием npx, обращаться к npm-пакету node, указывая его версию.</br> Пример команды:
```
 npx node@6 -v #v6.14.3
```
* Запуск произвольных фрагментов кода, доступных по некоему адресу</br>
Npx позволяет запускать не только код, опубликованный в npm. В частности, если у вас есть ссылка на некий фрагмент кода (например GitHub gist), запустить его можно так:
```
 npx https://gist.github.com/...
```
## Тесткейсы
### 1.1.Тестирование get запросов
**Название:**
GET запрос, параметр "message" передан с типом параметра string</br>
**Request url:** http://localhost:8000?message=true</br>
**Response status:** 200</br>
**Response body:** {"message": "true"}</br>
### 1.2.Тестирование get запросов
**Название:**
GET запрос, параметр "message" не передан</br>
**Request url:** http://localhost:8000?</br>
**Response status:** 422</br>
**Response body:** {"error": "'undefined' was not provided"}</br>
### 2.1.Тестирование post запросов
**Название:**
POST запрос, параметр "message" передан с типом параметра string</br>
**Request url:** http://localhost:8000</br>
**Request body:** {message: "true"}</br>
**Response status:** 200</br>
**Response body:** {"message": "true"}</br>
### 2.2.Теститрование post запросов
**Название:**
POST запрос, параметр "message" не передан</br>
**Request url:** http://localhost:8000</br>
**Request body:** {}</br>
**Response status:** 422</br>
**Response body:** {"error": "'undefined' was not provided"}</br>
### 2.3.Теститрование post запросов
**Название:**
POST запрос, параметр "message" передан с типом, отличным от string</br>
**Request url:** http://localhost:8000</br>
**Request body:** {message: true}</br>
**Response status:** 422</br>
**Response body:** {"error": "'true' was not a string"}</br>
### 2.4.Теститрование post запросов
**Название:**
POST запрос, параметр "message" передан с типом, отличным от string</br>
**Request url:** http://localhost:8000</br>
**Request body:** {message: 123}</br>
**Response status:** 422</br>
**Response body:** {"error": "'123' was not a string"}</br>