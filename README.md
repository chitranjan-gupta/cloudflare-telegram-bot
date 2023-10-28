# cloudflare-telegram-bot

## Setup
1. Run the cloudflare
   ```bash
   npm create cloudflare@latest   
   ```
2. It will ask `Need to install the following packages: create-cloudflare@2.6.2 Ok to proceed? (y)` Press y and Enter
3. It will ask `In which directory do you want to create your application?` Type your directory otherwise Enter for default
4. It will ask `What type of application do you want to create?` Select "Hello World" Worker and Enter
5. It will ask `Do you want to use TypeScript?` Select No
6. It will ask `Do you want to deploy your application?` Select No
7. Now go to your cloudflare worker directory
8. Now install this package
   ```bash
   npm i cloudflare-telegram-bot@latest
   ```
9. Now go to `src` directory
10. Edit the index.js, remove all the codes and add this
    ```
    const bot = require("cloudflare-telegram-bot");
    export default bot;
    ```
12. Now run the worker
    ```bash
    npm run dev
    ```

## Deployment
1. Deploy your bot on the cloud
   ```bash
   npm run deploy
   ```
