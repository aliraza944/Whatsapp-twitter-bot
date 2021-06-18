const Instagram = require("instagram-web-api");

 const username = process.env.INSTA_USERNAME;
 const password = process.env.INSTA_PASSWORD;

const client = new Instagram({ username, password });

const sendInsta = async (filePath, post) => {
  await client.login();
  // const profile = await client.getProfile();

  const { media } = await client.uploadPhoto({
    photo: filePath,
    caption: post,
    post: "feed",
  });
  console.log(`https://www.instagram.com/p/${media.code}/`);
};
module.exports.sendInsta = sendInsta;
