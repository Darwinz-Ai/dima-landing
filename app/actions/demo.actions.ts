"use server";

import { FormInputs } from "@/components/shared/form/RequestDemoForm";

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

    return { success: true };
  } catch (error) {
    console.log("Error when sending request:", error);
    return {
      success: false,
    };
  }
};
