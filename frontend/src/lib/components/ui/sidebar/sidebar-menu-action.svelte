<script lang="ts">
  import { fcd, type WithElementRef } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    showOnHover = false,
    children,
    child,
    ...restProps
  }: WithElementRef<HTMLButtonAttributes> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    showOnHover?: boolean;
  } = $props();

  const mergedProps = $derived({
    class: fcd({
      "hover": [
        "bg-sidebar-accent",
        "text-sidebar-accent-foreground",
      ],
      "peer-hover/menu-button": "text-sidebar-accent-foreground",
      "after": [
        "absolute",
        "-inset-2",
      ],
      "peer-data-": {
        "[size=sm]/menu-button": "top-1",
        "[size=default]/menu-button": "top-1.5",
        "[size=lg]/menu-button": "top-2.5",
      },
      "md": {
        "after": "hidden",
        "opacity-0": showOnHover,
      },
      "%layout":
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center",
      "%showOnHover": showOnHover &&
        [
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
          "group-focus-within/menu-item:opacity-100",
          "group-hover/menu-item:opacity-100",
          "data-[state=open]:opacity-100",
        ],
      "%visibility": "",
      "%text": "text-sidebar-foreground",
      "%border":
        "ring-sidebar-ring outline-hidden rounded-md focus-visible:ring-2",
      "[&>svg]": [
        "size-4",
        "shrink-0",
      ],
      "%spacing": "p-0",
      "%transition": "transition-transform",
      "group-data-[collapsible=icon]": "hidden",
    }, className),

    "data-slot": "sidebar-menu-action",
    "data-sidebar": "menu-action",
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <button bind:this={ref} {...mergedProps}>
    {@render children?.()}
  </button>
{/if}
