<script lang="ts">
  import { fcd, type WithElementRef } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    children,
    child,
    class: className,
    size = "md",
    isActive = false,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    size?: "sm" | "md";
    isActive?: boolean;
  } = $props();

  const mergedProps = $derived({
    class: fcd({
      "[&>svg]": [
        "text-sidebar-accent-foreground",
        "size-4",
        "shrink-0",
      ],
      "hover": [
        "text-sidebar-accent-foreground",
        "bg-sidebar-accent",
      ],
      "[&>span:last-child]": "truncate",
      "data-[active=true]": [
        "bg-sidebar-accent",
        "text-sidebar-accent-foreground",
      ],
      "active": [
        "bg-sidebar-accent",
        "text-sidebar-accent-foreground",
      ],
      "disabled": [
        "pointer-events-none",
        "opacity-50",
      ],
      "aria-disabled": [
        "pointer-events-none",
        "opacity-50",
      ],
      "text-xs": size === "sm",
      "text-sm": size === "md",
      "%": [
        "text-sidebar-foreground flex h-7 min-w-0 overflow-hidden",
        "group-data-[collapsible=icon]:hidden",
      ],
      "%position": "-translate-x-px items-center",
      "%spacing": "gap-2 px-2 rounded-md focus-visible:ring-2",
      "%border": "ring-sidebar-ring outline-hidden",
    }, className),
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "data-size": size,
    "data-active": isActive,
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <a bind:this={ref} {...mergedProps}>
    {@render children?.()}
  </a>
{/if}
