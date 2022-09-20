# discord-bot-uptime-monitor
Monitors the uptime of a Discord bot using Cloudflare Workers. Shows a badge containing the % uptime of bot
## How to setup yourself
1. Invite the bot to a Discord server with only you and the bot.<br>
2. Change the variable `bot_username` to the username of the bot **without the four digits after!** For a bot like "My Bot#1234", the username would be "My Bot"<br>
3. Enable the widget for the server<br>
![image](https://user-images.githubusercontent.com/101084582/191330573-5b471e86-edb1-4ca3-a05c-5d0cd1f5bc92.png)
![image](https://user-images.githubusercontent.com/101084582/191330923-1c2c67c6-0691-451e-9ffe-afdc50e97e64.png)<br>
4. [Copy the guild id](https://github.com/manix84/discord_gmod_addon_v2/wiki/Finding-your-Guild-ID-%28Server-ID%29) into worker.js as `guild_id`
5. Create a [replit](https://replit.com) repl, and run `echo $REPLIT_DB_URL` in the shell. Copy that into worker.js as `replit_db`
6. Inside the same repl from step 5, run `curl $REPLIT_DB_URL/fail=0` and `curl $REPLIT_DB_URL/success=0`
7. Create a [Cloudflare Worker](https://dash.cloudflare.com/sign-up/workers)
![image](https://user-images.githubusercontent.com/101084582/191332712-c01ca640-2e1f-49c5-8a10-e8d95d17b69a.png)<br>
Choose either router or handler because we're going to overwrite the file anyway
8. Click Quick Edit
![image](https://user-images.githubusercontent.com/101084582/191333141-dcc211f5-ee76-458c-ae19-d1697c307336.png)
9. Copy worker.js into the code block on the left
10. Click Save And Deploy on the bottom of the code block
11. Go back to the worker dashboard by clicking the worker's name in the top left
![image](https://user-images.githubusercontent.com/101084582/191333572-c64f0917-4871-44b9-b2c2-1081180f6288.png)
12. Click Triggers
![image](https://user-images.githubusercontent.com/101084582/191333700-6979f589-fc18-4f9e-8878-5deb0338a62a.png)
13. Scroll down until you see Cron Triggers.
14. Click Add Cron Trigger
15. Change how often it triggers depending on your liking
16. Click Add Trigger near the bottom left
17. You're done! You can now use the worker link as a badge to display uptime
