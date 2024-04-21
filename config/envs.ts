import { PlaywrightTestConfig } from "@playwright/test";

export interface EnvironmentConfig extends PlaywrightTestConfig {
    uiBaseUrl: string;
    apiBaseURL: string;
    username: string;
    password: string;
  }


export const environment: Record<string, EnvironmentConfig> = {
    dev: {
        uiBaseUrl :  "https://thinking-tester-contact-list.herokuapp.com",
        apiBaseURL : "https://thinking-tester-contact-list.herokuapp.com",
        username :   "sdfafasdads@landservices.com.au",
        password:    process.env.PASSWORD!,
    }
}