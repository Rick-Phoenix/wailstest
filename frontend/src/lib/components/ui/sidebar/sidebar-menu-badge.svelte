<script lang="ts">
  import { cn, fcd, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="sidebar-menu-badge"
  data-sidebar="menu-badge"
  class={fcd({
    "peer-data-": {
      "[size=sm]/menu-button": "top-1",
      "[size=default]/menu-button": "top-1.5",
      "[size=lg]/menu-button": "top-2.5",
      "[active=true]/menu-button": "text-sidebar-accent-foreground",
    },
    "group-data-[collapsible=icon]": "hidden",
    "peer-hover/menu-button": "text-sidebar-accent-foreground",
    "%text": "text-xs font-medium tabular-nums text-sidebar-foreground",
    "%": "",
    "%interactivity": "pointer-events-none select-none",
    "%layout":
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1",
  }, className)}
  {...restProps}
>
  {@render children?.()}
</div>
