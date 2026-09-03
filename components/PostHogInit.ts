'use client';

import { useEffect } from 'react';

export default function PostHogInit() {
    useEffect(() => {
        const initPostHog = async () => {
            const posthog = (await import('posthog-js')).default;

            // Prevent double initialization in development strict mode
            if (posthog.__loaded) return;

            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
                defaults: '2026-05-30',
                autocapture: false,
                disable_session_recording: true,
                capture_heatmaps: true
            });
        };

        // Safari doesn't support requestIdleCallback natively, so we fall back to setTimeout
        const requestIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 3000));

        requestIdle(() => {
            initPostHog();
        });
    }, []);

    return null;
}