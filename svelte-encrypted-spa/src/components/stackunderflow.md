# Stackunderflow CodeGym

### Stackoverflow main characteristics to replicate: 
1. Extremely fast load speed on initial connect (from Google). (100ms target)
2. No layout shift, no heavy images 
3. Simple formatting, accessible fonts, logical UI structure
4. Optimized SEO (incl. meta tags, sitemaps, rich results)

### 1. Extremely fast load speed on initial connect
- One HTML file with all styles and js in it
- Single request to get the HTML (all critical information is text)
- Logo in SVG format, native in HTML to avoid second request
- Servers (CDN) in 3 locations (US, Germany, Asia)
- Full-Text Search (SDN) on top of servers
- Serve gzip HTML files

**Method 1: Completely static** 
- Scale will be 2 Million Documents, each document will represent the full information needed for a page to render. This will be later tested against **Svelte Full SSR** and **NextJS Incremental Static Regeneration**. <br>
- All files will be saved under ext4 Linux filesystem [without upper bound](https://serverfault.com/questions/104986) for the files in a directory (may need to be extra configured). Single file lookup under ext4 is [0(1) constant time](https://stackoverflow.com/questions/27552694), it uses H-trees by default. For the backend, express server will be used, since [single-thread is not a bottleneck](https://javascript.plainenglish.io/how-many-requests-can-handle-a-real-world-nodejs-server-side-application-55da7a2f06f3) for our purposes - only i/o operations.For computationally intensive tasks, Node will be insufficient. 
- [Mongo Docker for local testing and easy uploading to the cloud](https://www.bmc.com/blogs/mongodb-docker-container/) For MongoDB management, Studio 3T GUI will be used and mongoose on the express backend. 
- I'm not using nginx, since it's not specific to the targets of this CodeGym, but it [protects against DDoS](https://www.nginx.com/blog/rate-limiting-nginx/) and in future nginx CodeGym will be considered. 
- For Full-Text Search, TypeSense will be used as part of SDN loaded in RAM in all 3 locations. It will be synced in real-time with Mongo in the central region
- The mongo Frankfurt server will provide Rest API for clients changing data. This will make changes slower, but Stackunderflow should be optimized for maximum read performance. Once data is changed, the Frankfurt mongo server will rebuild a HTML file with the new data and either change old file on the CDN or create / delete one. 
- Google indexing meta tags, rich search & sitemaps for all 2 million pages
- JS and CSS should be minimal and written per hand to ensure smallest possible file size
- Express with Gzip middleware will be used to deliver compressed files over the network

**Method 2: Incremental static regeneration** 
- [NextJS with its on-demand ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) with invalidation API will be used. A way to verify if HTML page was cached by CDN is needed. The project will be deployed to Vercel 



CSRF and XSS protection should be implemented. To prevent XSS I'm storing JWT in HTTP-Only, HSTS cookie. The token will be used to verify user serverside. This alone prevents XSS and MITM attacks, but exposes clients to CSRF. A Session random string will be stored in browser's Local Storage and sent by JavaScript manually upon each request to the API. If information requires auth to be viewed, storing it on API and thus hindering Googlebot and clients not running JS from viewing it is not an issue.


Following strategies can be used depending on frontend: 
- When using templating (ie. Handlebars, EJS): Store the CSRF Token as meta tag on rendering, so it's accessible with JavaScript
- Use Browser's LocalStorage, so there won't be a need to LogIn every time one closes the tab
- On new browsers, use JWT as cookie with SameSite Strict

Packages to be used: 
- [JWT generation and verification](https://www.npmjs.com/package/express-jwt)
- [Sanitize text inputs](https://www.npmjs.com/package/xss)
- [Prevent CSRF](https://www.npmjs.com/package/csurf)

On this project, CSRF is more important to protect against. If attacker finds XSS exploit and steals the CSRF token, it will only need to redirect a user to volunerable site to initiate successful API attack, since JWT cookie will be sent automatically. Only SameSite Strict Cookie Policy protects adequately.

95.3% of global browser users support SameSite policy, which is similar to webp image standards. Considering drastically improved security, this is enough.

DDOS Protection 

When protecting against DDOS above 50% server load, countermeasures should be scaled with demand. 

Packages to be used: 
- [Rate limit IP addresses after 80% server load](https://www.npmjs.com/package/express-rate-limit)
- [Computatinally expensive captcha with gradual complexity increase](https://mcaptcha.org/s)
- [Cloudflare reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-mitigate-ddos-attacks-against-your-website-with-cloudflare)