const guild_widget_url = ""; // replace the guild_widget_url here;
const replit_url = ""; // replace the repl url here
const bot_username = ""; // replace bot username here
const key = ""; // replace key used here

const base64ToUint8 = (str) => Uint8Array.from(atob(str.trim()), (c) => c.charCodeAt(0));
const encode = new TextEncoder();
const decode = new TextDecoder();
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

addEventListener("scheduled", (event) => {
  event.waitUntil(
    (async () => {
      let result = await fetch(
        replit_url
      ).then((res) => res.text());
      let parts = result.split("$");
      let iv = base64ToUint8(parts[0]);
      let enc = base64ToUint8(parts[1]);
      const replit_db = decode.decode(new Uint8Array(await crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: iv
        },
        await crypto.subtle.importKey(
          "raw",
          encode.encode(key),
          "AES-CBC",
          false,
          ["decrypt"]
        ),
        enc
      )))
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
  let result = await fetch(
    replit_url
  ).then((res) => res.text());
  let parts = result.split("$");
  let iv = base64ToUint8(parts[0]);
  let enc = base64ToUint8(parts[1]);
  const replit_db = decode.decode(new Uint8Array(await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: iv
    },
    await crypto.subtle.importKey(
      "raw",
      encode.encode(key),
      "AES-CBC",
      false,
      ["decrypt"]
    ),
    enc
  )))

  let offline = await fetch(replit_db + "/fail").then((res) => res.text());
  offline = parseInt(offline);
  let online = await fetch(replit_db + "/success").then((res) => res.text());
  online = parseInt(online);
  let percent = (online * 100) / (online + offline);
  percent = Math.round(percent * 100) / 100;
  return await fetch(
    "https://img.shields.io/badge/uptime-" + percent + "%25-red"
  );
}
