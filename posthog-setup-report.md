<wizard-report>
# PostHog post-wizard report

The wizard has completed a full PostHog integration for thedar.ai — a Next.js 16 App Router application with Arabic AI analytics tools and a demo request conversion funnel. Client-side tracking was initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern) and a reverse proxy was added to `next.config.ts`. A server-side PostHog Node client was created in `lib/posthog-server.ts`. Events are captured across all interactive tools and the demo request form, with user identification performed on the client side at demo submission and server-side via the demo server action.

| Event Name | Description | File |
|---|---|---|
| `demo_requested` | User successfully submitted the request demo form with their contact details. | `components/shared/form/RequestDemoForm.tsx` |
| `demo_request_failed` | The demo request form submission failed due to a server or network error. | `components/shared/form/RequestDemoForm.tsx` |
| `demo_request_submitted` | Server-side: demo form data was successfully stored in the database. | `app/actions/demo.actions.ts` |
| `arabic_dialect_analyzed` | User ran the Arabic dialect analyzer and received results for a selected dialect. | `app/[locale]/tools/arabic-dialect/components/DialectAnalyzer.tsx` |
| `arabic_mention_calculator_submitted` | User calculated Arabic mention coverage gap results using the mention analyzer tool. | `app/[locale]/tools/arabic-mention-analyzer/components/Calculator.tsx` |
| `crisis_readiness_score_calculated` | User completed the crisis readiness assessment and submitted it to view their score. | `app/[locale]/tools/crisis-readiness-score/components/CrisisReadinessScore.tsx` |
| `crisis_readiness_action_plan_downloaded` | User downloaded the PDF action plan after completing the crisis readiness assessment. | `app/[locale]/tools/crisis-readiness-score/components/CrisisReadinessScore.tsx` |
| `pr_calculator_publication_selected` | User selected a publication in the PR value calculator to view its metrics. | `app/[locale]/tools/pr-calculator/components/PRCalculator.tsx` |
| `pr_calculator_custom_publication_added` | User added a custom publication with their own impression data to the PR calculator. | `app/[locale]/tools/pr-calculator/components/PRCalculator.tsx` |
| `arabic_coverage_audit_started` | User entered keywords and moved to step 2 of the Arabic coverage gap audit wizard. | `app/[locale]/tools/arabic-coverage-gap-audit/components/ArabicCoverageWizard.tsx` |
| `arabic_coverage_audit_completed` | User completed the Arabic coverage gap audit and received expanded keyword results. | `app/[locale]/tools/arabic-coverage-gap-audit/components/ArabicCoverageWizard.tsx` |
| `arabic_dialect_analysis_requested` | Server-side: Arabic dialect analysis was triggered via the Vertex AI server action. | `app/[locale]/tools/actions.ts` |
| `arabic_coverage_analysis_requested` | Server-side: Arabic keyword coverage analysis was triggered via the Vertex AI server action. | `app/[locale]/tools/actions.ts` |
| `tco_calculator_submitted` | User calculated the total cost of ownership for their current media stack. | `app/[locale]/tools/stack-consolidation-calculator/components/TCOCalculator.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/479769/dashboard/1754200)
- **Insight**: [Demo Requests (Total)](https://us.posthog.com/project/479769/insights/JL70PL8A)
- **Insight**: [Demo Request Conversion Funnel](https://us.posthog.com/project/479769/insights/OxWcGmN1)
- **Insight**: [Tool Usage Over Time](https://us.posthog.com/project/479769/insights/9rB59PEn)
- **Insight**: [PR Calculator & Coverage Audit Engagement](https://us.posthog.com/project/479769/insights/G6nyEACb)
- **Insight**: [Crisis Readiness Score & PDF Downloads](https://us.posthog.com/project/479769/insights/4Qjs2VZK)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap/onboarding scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify in PostHog Error Tracking.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
