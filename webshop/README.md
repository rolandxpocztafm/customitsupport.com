# Custom IT Support - Static Website

This is a static HTML/CSS/JavaScript website that requires **NO BUILD PROCESS**.

## How to Deploy

Simply copy all files from the `public/` folder to your web server:

1. Copy `index.html`, `shop.html`, `calculator.html` to your web server
2. Copy `hero-mining.jpg` (and any other images) to the same directory
3. That's it! No npm install, no build process needed.

## Files Structure

```
public/
├── index.html          # Homepage
├── shop.html           # Shop page
├── calculator.html     # Calculator page
├── hero-mining.jpg     # Hero background image
└── README.md          # This file
```

## Technologies Used

- **Tailwind CSS** - via CDN (no build required)
- **Lucide Icons** - via CDN (no build required)
- **Vanilla JavaScript** - no frameworks needed
- **HTML5 & CSS3** - standard web technologies

## GitHub Pages Deployment

If deploying to GitHub Pages:

1. Push all files to your repository
2. Go to Settings > Pages
3. Select the branch (usually `main`)
4. Select `/public` as the folder
5. Save and your site will be live!

## Custom Domain

To use your custom domain (customitsupport.com):

1. Add a CNAME file with your domain
2. Configure DNS A records pointing to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

Or configure your web hosting to point to the directory where you uploaded these files.

## No Build Process Benefits

✅ Copy and paste deployment
✅ Works on any static hosting
✅ No Node.js required
✅ No dependencies to manage
✅ Instant updates - just edit HTML
✅ Works with GitHub Pages, Netlify, Vercel, or any web server
