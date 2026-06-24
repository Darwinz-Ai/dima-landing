"use server";

import { FormInputs } from "@/components/shared/form/RequestDemoForm";
import { getPostHogClient } from "@/lib/posthog-server";

export const requestDemo = async (data: FormInputs) => {
  const dbURL = process.env.DATABASE_URL;

  try {
    const response = await fetch(dbURL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        success: false,
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
        source: "server_action"
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

    return { success: true };
  } catch (error) {
    console.log("Error when sending request:", error);
    return {
      success: false,
    };
  }
};
