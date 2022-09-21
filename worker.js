const guild_widget_url = ""; // replace the guild_widget_url here;
const replit_db = "https://kv.replit.com/v0/<token here>"; // replace the replit db url here
const bot_username = "Bot"; // replace bot username here
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
addEventListener("scheduled", (event) => {
  event.waitUntil(
    (async () => {
      let b = await fetch(
        guild_widget_url
      ).then((res) => res.json());
      console.log(b);
      for (const member of b.members) {
        console.log(member);
        if (member.username === bot_username) {
          let res = await fetch(replit_db + "/success").then((res) =>
            res.text()
          );
          let val = parseInt(res);
          await fetch(replit_db + "/success=" + (val + 1), {
            method: "POST",
          });
          return;
        }
      }
      let res = await fetch(replit_db + "/fail").then((res) => res.text());
      let val = parseInt(res);
      await fetch(replit_db + "/fail=" + (val + 1), {
        method: "POST",
      });
      console.log("offline");
    })()
  );
});

async function handleRequest(request) {
  let offline = await fetch(replit_db + "/fail").then((res) => res.text());
  offline = parseInt(offline);
  let online = await fetch(replit_db + "/success").then((res) => res.text());
  online = parseInt(online);
  let percent = (online * 100) / (online + offline);
  return await fetch(
    "https://img.shields.io/badge/uptime-" + percent + "%25-red"
  );
}
