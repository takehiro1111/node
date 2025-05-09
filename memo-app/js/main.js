console.log("app.jsの稼働開始")

import { appendFile } from 'node:fs';

appendFile("test.txt", "data to append", (err) => {
  if (err) throw err
  console.log('The "data to append" was appended to file!')
})
