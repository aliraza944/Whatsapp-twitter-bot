const puppeteer = require("puppeteer");
const path = require("path");

const sendTweet = async (filePath, post) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  const url = "https://twitter.com/?lang=en";
  await page.goto(url, { waitUntil: "load", timeout: 0 });

  // click the login button on the twitter newPage
  await page.waitForSelector("[href='/login']", { timeout: 0 });

  const target = await page.$("[href='/login']");
  await target.click();

  //  userName and Password input and then press the login button
  await page.waitForSelector(
    "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(6) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input",
    { timeout: 0 }
  );
  const userName = await page.$(
    "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(6) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input"
  );

  await userName.type(process.env.TWIITER_USERNAME);
  const password = await page.$(
    "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(7) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input"
  );

  await password.type(process.env.TWIITER_PASSWORD);

  // press login button
  const loginButton = await page.$(
    "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(8) > div"
  );
  await loginButton.click();

  // type the tweet and place upload the picture

  await page.waitForSelector(
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-oyd9sg > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-1h8ys4a.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div.css-1dbjc4n.r-184en5c > div > div > div > div > div > div > div > div > div > div.css-901oao.r-18jsvk2.r-6koalj.r-16y2uox.r-1qd0xha.r-adyw6z.r-16dba41.r-135wba7.r-bcqeeo.r-qvutc0 > div > div > div > div.DraftEditor-editorContainer > div",
    { timeout: 0 }
  );
  const tweeetDescription = await page.$(
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-oyd9sg > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-1h8ys4a.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div.css-1dbjc4n.r-184en5c > div > div > div > div > div > div > div > div > div > div.css-901oao.r-18jsvk2.r-6koalj.r-16y2uox.r-1qd0xha.r-adyw6z.r-16dba41.r-135wba7.r-bcqeeo.r-qvutc0 > div > div > div > div.DraftEditor-editorContainer > div"
  );

  await tweeetDescription.type(post);

  // const photo = "madrid.jpg";
  //   const photo = path.join("images", "meme.jpg");
  console.log(filePath);
  await page.waitForSelector(
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-oyd9sg > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-1h8ys4a.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div:nth-child(4) > div > div > div:nth-child(1) > input",
    { timeout: 0 }
  );

  const photouploader = await page.$(
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-oyd9sg > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-1h8ys4a.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div:nth-child(4) > div > div > div:nth-child(1) > input"
  );
  await photouploader.uploadFile(filePath);
  await page.waitForTimeout(5000);
  await page.waitForSelector("div [data-testid=tweetButtonInline]", {
    timeout: 0,
  });
  await page.evaluate(() =>
    document.querySelector("div [data-testid=tweetButtonInline]").click()
  );
  //   const sendButton = await page.$("div [data-testid=tweetButtonInline]");
  //   await sendButton.click();

  //   await page.keyboard.press("Enter");
  //   await page.click("div [data-testid=tweetButtonInline]");
}; //end sendTweet function
module.exports.sendTweet = sendTweet;
