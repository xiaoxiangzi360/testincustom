const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "@nuxt/content:urls",
            "description": "Generated from your markdown files.",
            "tips": [
                "Enabled because you've set `config.strictNuxtContentPaths: true`."
            ]
        },
        "fetch": "/__sitemap__/nuxt-content-urls.json",
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/cart"
            },
            {
                "loc": "/"
            },
            {
                "loc": "/login"
            },
            {
                "loc": "/search"
            },
            {
                "loc": "/returns"
            },
            {
                "loc": "/checkout"
            },
            {
                "loc": "/myorders"
            },
            {
                "loc": "/register"
            },
            {
                "loc": "/userinfo"
            },
            {
                "loc": "/orderinfo"
            },
            {
                "loc": "/contact-us"
            },
            {
                "loc": "/paysuccess"
            },
            {
                "loc": "/article/faq"
            },
            {
                "loc": "/categorybak"
            },
            {
                "loc": "/productinfo"
            },
            {
                "loc": "/track-order"
            },
            {
                "loc": "/financerecord"
            },
            {
                "loc": "/order-history"
            },
            {
                "loc": "/forgetpassword"
            },
            {
                "loc": "/delivery-policy"
            },
            {
                "loc": "/article/about-us"
            },
            {
                "loc": "/article/contact-us"
            },
            {
                "loc": "/article/privacy-policy"
            },
            {
                "loc": "/article/warranty-policy"
            },
            {
                "loc": "/article/terms-of-service"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:route-rules",
            "description": "Generated from your route rules config.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:route-rules'] }`."
            ]
        },
        "urls": [
            "/hidden"
        ],
        "sourceType": "app"
    }
];

export { sources };
