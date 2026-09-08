"use server";

import { FormInputs } from "@/components/shared/form/RequestDemoForm";
import { getPostHogClient } from "@/lib/posthog-server";

export const requestDemo = async (data: FormInputs, posthog_session_id: string) => {
  const dbURL = process.env.DATABASE_URL;

  try {

    const response = await fetch(dbURL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-POSTHOG-SESSION-ID': posthog_session_id,
        "X-Client-Platform": "web",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => null);
      return {
        success: false,
        message: errorResponse?.message || "Failed to submit demo request",
        errorCode: errorResponse?.error || null
      };
    }
    const posthog = getPostHogClient();

    posthog.capture({
      distinctId: data.email,
      event: "demo_request_submitted",
      properties: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        company_name: data.companyName,
        source: "server_action",
        $session_id: posthog_session_id,
      }
    });

    posthog.identify({
      distinctId: data.email,
      properties: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        company_name: data.companyName
      }
    })

    await posthog.shutdown();

    return { success: true };
  } catch (error) {
    // console.log("Error when sending request:", error);
    return {
      success: false,
      message: "A network or server error occurred.",
    };
  }
};
