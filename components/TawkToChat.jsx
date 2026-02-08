"use client";
import { useEffect } from 'react';

export default function TawkToChat() {
    useEffect(() => {
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        
        (function() {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/697f415cc9bdb51c3ad4013c/1jgchekbs';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();

        // AGGRESSIVE BUBBLE HIDING - Multiple methods combined
        
        // Method 1: Hide on widget load
        Tawk_API.onLoad = function() {
            hideBubble();
        };

        // Method 2: Hide bubble function
        const hideBubble = () => {
            // Target all possible bubble elements
            const selectors = [
                '#tawk-bubble-container',
                '.tawk-bubble-text',
                '#tawk-bubble',
                '[class*="bubble"]',
                'iframe[title*="bubble"]'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (el && !el.classList.contains('tawk-button')) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.opacity = '0';
                    }
                });
            });
        };

        // Method 3: Repeated checks (bubble might load later)
        setTimeout(hideBubble, 500);
        setTimeout(hideBubble, 1000);
        setTimeout(hideBubble, 2000);
        setTimeout(hideBubble, 3000);

        // Method 4: Watch for new elements (MutationObserver)
        const observer = new MutationObserver(() => {
            hideBubble();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Method 5: Add CSS directly via JavaScript
        const style = document.createElement('style');
        style.innerHTML = `
            #tawk-bubble-container,
            .tawk-bubble-text,
            #tawk-bubble,
            iframe[title*="bubble"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);

        // Cleanup
        return () => {
            observer.disconnect();
            if (style.parentNode) {
                document.head.removeChild(style);
            }
        };
    }, []);

    return null;
}
