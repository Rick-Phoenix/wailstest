<script lang="ts">
  import { fcd, type WithElementRef } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    children,
    child,
    class: className,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const mergedProps = $derived({
    class: fcd({
      "[&>svg]": [
        "size-4",
        "shrink-0",
      ],
      "group-data-[collapsible=icon]": [
        "-mt-8",
        "opacity-0",
      ],
      "%transition": [
        "transition-[margin,opacity]",
        "duration-200",
        "ease-linear",
      ],
      "%text": [
        "text-xs",
        "font-medium",
        "text-sidebar-foreground/70",
      ],
      "%border": [
        "focus-visible:ring-2",
        "rounded-md",
        "ring-sidebar-ring",
        "outline-hidden",
      ],
      "%layout": [
        "flex",
        "h-8",
        "shrink-0",
        "items-center",
        "px-2",
      ],
    }, className),

    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>
    {@render children?.()}
  </div>
{/if}
