// generate-sitemap.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { SitemapStream, streamToPromise } = require('sitemap');

// Replace this with your actual website URL
const SITE_URL = 'https://riterapublishing.com';

(async () => {
    const sitemap = new SitemapStream({ hostname: SITE_URL });

    const writeStream = fs.createWriteStream(path.join(__dirname, 'public', 'sitemap.xml'));
    sitemap.pipe(writeStream);

    // Define your static routes here manually if needed
    const staticRoutes = [
        '/',
        '/aboutus',
        '/contact',
        '/people-behind-ritera',
        '/packages',
        '/books/:slug',
        '/blog',
        '/blog-category/self-publishing',
        '/blog-category/our-books',
        '/blog-category/inside-ritera',
        '/blog/:slug',
        '/litspace',
        '/litspace-category/poem',
        '/litspace-category/short-story',
        '/litspace-category/article',
        '/litspace/:slug'
    ];

    staticRoutes.forEach((route) => {
        sitemap.write({ url: route, changefreq: 'monthly', priority: 0.8 });
    });

    sitemap.end();

    await streamToPromise(sitemap);
    console.log('✅ Sitemap successfully generated at public/sitemap.xml');
})();
