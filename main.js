const PORT = 8000;

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

//ウェブスクレイパーを作成する
const URL = 'https://search.rakuten.co.jp/search/mall/%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/'; // スクレイピングするURLを指定
const data = [];

axios(URL)
  .then((response) => {
    const htmlParser = response.data;
    // console.log(htmlParser);

    const $ = cheerio.load(htmlParser);

    $('.searchresultitem', htmlParser).each(function () {
      const title = $(this).find('.title').text(); // 商品名を取得
      // console.log(title);
      const price = $(this).find('.price--3zUvk').text(); // 価格を取得
      data.push({ title, price }); // 商品名と価格をdata配列に追加
      console.log(data);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
