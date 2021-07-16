# 短網址專案

<br>

此專案可以讓使用者轉換輸入的網址為短網址，並透過短網址連結至原本輸入的網站。

也可透過 heroku 連結使用本專案：https://shielded-escarpment-56257.herokuapp.com/

<br>

## 專案功能

1. 使用者可以輸入網址
2. 使用者可以轉換輸入網址為短網址
3. 使用者可以點擊複製按鈕，複製短網址

<br>

## 畫面瀏覽
![alphacamp 2-3 A14 作業](https://user-images.githubusercontent.com/78346513/125934903-a0f63e0d-406b-4bb8-97fd-3ab804048fbf.png)

<br>

## 建置環境

<br>

* node.js : ^10.15.0
* express: ^4.17.1
* express-handlebars: ^5.3.2
* mongoose: ^5.12.0
* mongoDB: ^4.2.14

<br>

## 安裝流程

<br>

1. 藉由 git clone 將專案下載至本地
```
git clone https://github.com/WilliamTsou818/shortenURL-project.git
```
2. 進入專案資料夾
```
cd shortenURL-project
```
3. 安裝套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```
5. 啟動網頁伺服器
```
npm run dev
```
6. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

Server is running on http://localhost:3000