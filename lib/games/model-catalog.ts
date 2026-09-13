export type ModelProvider = "anthropic" | "openai" | "google" | "opencode"

export interface GameModelEntry {
  readonly id: string
  readonly name: string
  readonly provider: ModelProvider
  readonly providerLabel: string
  readonly tagline: string
  readonly badge?: string
}

export const MODEL_PROVIDERS: readonly {
  readonly id: ModelProvider
  readonly name: string
}[] = [
  { id: "anthropic", name: "Anthropic" },
  { id: "openai", name: "OpenAI" },
  { id: "google", name: "Google Gemini" },
  { id: "opencode", name: "OpenCode Zen" },
] as const

/**
 * The models a game can be built with, grouped by provider.
 *
 * Client-safe on purpose: ids, provider groupings, and copy, and nothing that
 * pulls in provider SDKs or reaches for environment API keys.
 */
export const GAME_MODELS = [
  // Anthropic
  {
    id: "claude-opus-5",
    name: "Opus 5",
    provider: "anthropic",
    providerLabel: "Anthropic",
    tagline: "The most capable builder — best for a game from scratch.",
    badge: "Flagship",
  },
  {
    id: "claude-sonnet-5",
    name: "Sonnet 5",
    provider: "anthropic",
    providerLabel: "Anthropic",
    tagline: "Most of the ability, a good deal faster. Good for iterating.",
    badge: "Balanced",
  },
  {
    id: "claude-haiku-4-5",
    name: "Haiku 4.5",
    provider: "anthropic",
    providerLabel: "Anthropic",
    tagline: "The quickest and cheapest — best for small, specific tweaks.",
    badge: "Fast",
  },

  // OpenAI
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    providerLabel: "OpenAI",
    tagline: "Versatile flagship model with high coding proficiency.",
    badge: "Flagship",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "openai",
    providerLabel: "OpenAI",
    tagline: "Ultra-fast and cost-efficient for rapid modifications.",
    badge: "Fast",
  },
  {
    id: "o3-mini",
    name: "o3-mini",
    provider: "openai",
    providerLabel: "OpenAI",
    tagline: "High-reasoning model optimized for complex logic and math.",
    badge: "Reasoning",
  },

  // Google Gemini
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "google",
    providerLabel: "Google",
    tagline: "Deep reasoning across long context with nuanced coding ability.",
    badge: "Flagship",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "google",
    providerLabel: "Google",
    tagline: "Fast, responsive generation with excellent tool performance.",
    badge: "Fast",
  },

  // OpenCode Zen (OpenAI-compatible adapter)
  {
    id: "opencode-zen",
    name: "Zen Sonnet",
    provider: "opencode",
    providerLabel: "OpenCode Zen",
    tagline: "OpenCode Zen gateway routing to advanced coding model.",
    badge: "Zen",
  },
  {
    id: "opencode-zen-fast",
    name: "Zen Fast",
    provider: "opencode",
    providerLabel: "OpenCode Zen",
    tagline: "OpenCode Zen lightweight high-throughput coding model.",
    badge: "Fast",
  },
] as const

/**
 * The id of a model this app offers.
 *
 * Derived from the catalog rather than written out again, so the union and the
 * list a player sees cannot drift: adding an entry above is the whole of adding
 * a model, and every exhaustive switch on this type reports what is missing.
 */
export type GameModelId = (typeof GAME_MODELS)[number]["id"]

/**
 * What a turn runs on when nothing picked otherwise.
 */
export const DEFAULT_GAME_MODEL_ID: GameModelId = "claude-opus-5"

/**
 * Whether a value names a model this app offers.
 */
export function isGameModelId(value: unknown): value is GameModelId {
  return GAME_MODELS.some((model) => model.id === value)
}

/**
 * Finds the model catalog entry for an id.
 */
export function getGameModel(modelId: GameModelId): GameModelEntry {
  const found = GAME_MODELS.find((model) => model.id === modelId)
  if (!found) {
    throw new Error(`Unknown model id: ${modelId}`)
  }
  return found
}
