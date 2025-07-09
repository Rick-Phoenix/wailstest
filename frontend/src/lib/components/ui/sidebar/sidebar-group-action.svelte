<script lang="ts">
  import { fcd, type WithElementRef } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    ...restProps
  }: WithElementRef<HTMLButtonAttributes> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const mergedProps = $derived({
    class: fcd({
      "[&>svg]": [
        "size-4",
        "shrink-0",
      ],
      "after": [
        "absolute",
        "-inset-2",
      ],
      "hover": [
        "bg-sidebar-accent",
        "text-sidebar-accent-foreground",
      ],
      "md": "after:hidden",
      "%layout": [
        "flex-center",
        "aspect-square",
        "w-5",
        "p-0",
      ],
      "%positioning": ["absolute", "right-3", "top-3.5"],
      "%border": [
        "ring-sidebar-ring",
        "outline-hidden",
        "rounded-md",
        "focus-visible:ring-2",
      ],
      "%text": "text-sidebar-foreground",
      "group-data-[collapsible=icon]": "hidden",
      "%transition": "transition-transform",
    }, className),

    "data-slot": "sidebar-group-action",
    "data-sidebar": "group-action",
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
