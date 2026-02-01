import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/*?*'
                ]
            },
            // OpenAI
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },

            // Google / Gemini
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'Gemini-Deep-Research', allow: '/' },

            // Anthropic (Claude)
            { userAgent: 'Anthropic-ai', allow: '/' },

            // DeepSeek
            { userAgent: 'DeepSeekBot', allow: '/' },

            // Others
            { userAgent: 'CCBot', allow: '/' },
            { userAgent: 'DuckDuckBot', allow: '/' },
            { userAgent: 'facebookexternalhit', allow: '/' },
        ],
        sitemap: 'https://thedar.ai/sitemap.xml',
    }
}