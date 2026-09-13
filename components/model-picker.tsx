"use client"

import { ChevronDownIcon, GripIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroupButton } from "@/components/ui/input-group"
import {
  GAME_MODELS,
  MODEL_PROVIDERS,
  type GameModelId,
} from "@/lib/games/model-catalog"

/**
 * Which model the next turn is built with.
 *
 * Controlled, and deliberately owns nothing: the selection belongs to whoever
 * is sending the turns, because that is who has to put it on the wire. This
 * renders the catalog grouped by provider and reports a pick.
 */
export function ModelPicker({
  modelId,
  onModelChange,
}: {
  modelId: GameModelId
  onModelChange: (modelId: GameModelId) => void
}) {
  const selected = GAME_MODELS.find((model) => model.id === modelId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <InputGroupButton>
            <GripIcon />
            {selected?.name ?? modelId}
            <ChevronDownIcon />
          </InputGroupButton>
        }
      />
      <DropdownMenuContent className="max-h-96 w-80 overflow-y-auto">
        <DropdownMenuRadioGroup
          value={modelId}
          onValueChange={(value) => onModelChange(value as GameModelId)}
        >
          {MODEL_PROVIDERS.map((provider, index) => {
            const providerModels = GAME_MODELS.filter(
              (model) => model.provider === provider.id
            )
            if (providerModels.length === 0) return null

            return (
              <DropdownMenuGroup key={provider.id}>
                {index > 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel className="px-2 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                  {provider.name}
                </DropdownMenuLabel>
                {providerModels.map((model) => (
                  <DropdownMenuRadioItem
                    key={model.id}
                    value={model.id}
                    className="cursor-pointer py-1.5"
                  >
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">
                          {model.name}
                        </span>
                        {model.badge && (
                          <span className="rounded border border-border/50 bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <span className="line-clamp-2 text-xs text-muted-foreground">
                        {model.tagline}
                      </span>
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuGroup>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
