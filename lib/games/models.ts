import { anthropic } from "@ai-sdk/anthropic"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createOpenAI } from "@ai-sdk/openai"
import type { LanguageModel } from "ai"

import type { GameModelId } from "./model-catalog"

/**
 * Provider instances configured for the app.
 *
 * Each provider initializes cleanly. The API keys are read lazily when the
 * model is called, so having optional providers configured does not fail startup
 * if their API key has not been supplied.
 */
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const google = createGoogleGenerativeAI({
  apiKey:
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY,
})

/**
 * OpenCode Zen OpenAI-compatible provider adapter.
 *
 * Connects to OpenCode Zen API (or any configured OpenCode proxy) using the
 * standard OpenAI protocol, enabling full Daytona sandbox tool calling.
 */
const opencodeZen = createOpenAI({
  name: "opencode-zen",
  baseURL:
    process.env.OPENCODE_ZEN_BASE_URL ||
    process.env.OPENCODE_BASE_URL ||
    "https://zen.opencode.ai/v1",
  apiKey:
    process.env.OPENCODE_ZEN_API_KEY ||
    process.env.OPENCODE_API_KEY ||
    "zen-key",
})

/**
 * The provider instance behind each catalog entry.
 *
 * Server-side only — constructing these reaches for environment keys, and
 * the provider SDK has no business in a browser bundle. Reach for the catalog
 * instead of this file from anything a client component can touch.
 *
 * `satisfies` rather than an annotation, so the record has to cover every
 * `GameModelId` — a model added to the catalog and forgotten here is a type
 * error, not an undefined model discovered at the top of someone's turn.
 */
export const gameModels = {
  // Anthropic Claude
  "claude-opus-5": anthropic("claude-opus-5"),
  "claude-sonnet-5": anthropic("claude-sonnet-5"),
  "claude-haiku-4-5": anthropic("claude-haiku-4-5"),

  // OpenAI
  "gpt-4o": openai("gpt-4o"),
  "gpt-4o-mini": openai("gpt-4o-mini"),
  "o3-mini": openai("o3-mini"),

  // Google Gemini
  "gemini-2.5-pro": google("gemini-2.5-pro"),
  "gemini-2.5-flash": google("gemini-2.5-flash"),

  // OpenCode Zen (OpenAI-compatible)
  "opencode-zen": opencodeZen(
    process.env.OPENCODE_ZEN_MODEL || "claude-3-7-sonnet"
  ),
  "opencode-zen-fast": opencodeZen(
    process.env.OPENCODE_ZEN_FAST_MODEL || "gpt-4o-mini"
  ),
} satisfies Record<GameModelId, LanguageModel>
