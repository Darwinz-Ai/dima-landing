import { fetchBlogs } from "@/lib/firebase/blogsFunctions";
import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions";
import { CaseStudy } from "@/types";
import { Blog } from "@/types/blog";

export default async function sitemap() {
  // Fetch blogs and case studies (en and ar)
  const [allBlogs, allCases] = await Promise.all([
    fetchBlogs("en", [], null),
    fetchCaseStudies("en", {}, null),
  ]);

  const formatDynamicEntries = (
    items: (Blog | CaseStudy)[],
    type: "blogs" | "case-studies"
  ) => {

    return items.map((item) => ({
      url: `https://thedar.ai/en/${type}/${item.id}`,
      lastModified: item.dateCreated.toDate(),
      changeFrequency: type === "blogs" ? "weekly" : "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `https://thedar.ai/en/${type}/${item.id}`,
          ar: `https://thedar.ai/ar/${type}/${item.id}`,
          "x-default": `https://thedar.ai/${type}/${item.id}`
        },
      },
    }));
  };

  const dynamicEntries = [
    ...formatDynamicEntries(allBlogs, "blogs"),
    ...formatDynamicEntries(allCases, "case-studies"),
  ];

  return [
    {
      url: "https://thedar.ai/en",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en",
          ar: "https://thedar.ai/ar",
          "x-default": "https://thedar.ai"
        },
      },
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://thedar.ai/en/solutions/social-listening-analytics",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/solutions/social-listening-analytics",
          ar: "https://thedar.ai/ar/solutions/social-listening-analytics",
          "x-default": "https://thedar.ai/solutions/social-listening-analytics",
        },
      },
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://thedar.ai/en/solutions/pr-comms",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/solutions/pr-comms",
          ar: "https://thedar.ai/ar/solutions/pr-comms",
          "x-default": "https://thedar.ai/solutions/pr-comms",
        },
      },
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://thedar.ai/en/solutions/market-insights",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/solutions/market-insights",
          ar: "https://thedar.ai/ar/solutions/market-insights",
          "x-default": "https://thedar.ai/solutions/market-insights",
        },
      },
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://thedar.ai/en/solutions/consumer-insights",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/solutions/consumer-insights",
          ar: "https://thedar.ai/ar/solutions/consumer-insights",
          "x-default": "https://thedar.ai/solutions/consumer-insights",
        },
      },
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://thedar.ai/en/solutions/own-page-intelligence",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/solutions/own-page-intelligence",
          ar: "https://thedar.ai/ar/solutions/own-page-intelligence",
          "x-default": "https://thedar.ai/solutions/own-page-intelligence",
        },
      },
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://thedar.ai/en/blogs",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/blogs",
          ar: "https://thedar.ai/ar/blogs",
          "x-default": "https://thedar.ai/blogs",
        },
      },
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://thedar.ai/en/case-studies",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/case-studies",
          ar: "https://thedar.ai/ar/case-studies",
          "x-default": "https://thedar.ai/case-studies",
        },
      },
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://thedar.ai/en/tools",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/tools",
          ar: "https://thedar.ai/ar/tools",
          "x-default": "https://thedar.ai/tools",
        },
      },
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://thedar.ai/en/tools/arabic-coverage-gap-audit",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/tools/arabic-coverage-gap-audit",
          ar: "https://thedar.ai/ar/tools/arabic-coverage-gap-audit",
          "x-default": "https://thedar.ai/tools/arabic-coverage-gap-audit",
        },
      },
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://thedar.ai/en/tools/arabic-dialect",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/tools/arabic-dialect",
          ar: "https://thedar.ai/ar/tools/arabic-dialect",
          "x-default": "https://thedar.ai/tools/arabic-dialect",
        },
      },
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://thedar.ai/en/tools/arabic-mention-analyzer",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/tools/arabic-mention-analyzer",
          ar: "https://thedar.ai/ar/tools/arabic-mention-analyzer",
          "x-default": "https://thedar.ai/tools/arabic-mention-analyzer",
        },
      },
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://thedar.ai/en/tools/crisis-readiness-score",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/tools/crisis-readiness-score",
          ar: "https://thedar.ai/ar/tools/crisis-readiness-score",
          "x-default": "https://thedar.ai/tools/crisis-readiness-score",
        },
      },
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://thedar.ai/en/tools/stack-consolidation-calculator",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/tools/stack-consolidation-calculator",
          ar: "https://thedar.ai/ar/tools/stack-consolidation-calculator",
          "x-default": "https://thedar.ai/tools/stack-consolidation-calculator",
        },
      },
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://thedar.ai/en/privacy-policy",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/privacy-policy",
          ar: "https://thedar.ai/ar/privacy-policy",
          "x-default": "https://thedar.ai/privacy-policy",
        },
      },
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://thedar.ai/en/request-demo",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://thedar.ai/en/request-demo",
          ar: "https://thedar.ai/ar/request-demo",
          "x-default": "https://thedar.ai/request-demo",
        },
      },
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...dynamicEntries,
  ];
}
