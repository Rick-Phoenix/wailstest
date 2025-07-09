<script lang="ts">
  import { fcd, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { useSidebar } from "./context.svelte.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> =
    $props();

  const sidebar = useSidebar();
</script>

<button
  bind:this={ref}
  data-sidebar="rail"
  data-slot="sidebar-rail"
  aria-label="Toggle Sidebar"
  tabIndex={-1}
  onclick={sidebar.toggle}
  title="Toggle Sidebar"
  class={fcd({
    "hover": {
      "after": "bg-sidebar-border",
      "group-data-[collapsible=offcanvas]": "bg-sidebar",
    },
    "after": [
      "absolute",
      "inset-y-0",
      "left-[calc(1/2*100%-1px)]",
      "w-[2px]",
    ],
    "group-data-": {
      "[collapsible=offcanvas]": ["translate-x-0", "after:left-full"],
      "[side=left]": "-right-4",
      "[side=right]": "left-0",
    },
    "[[data-side=left]": {
      "[data-state=collapsed]_&]": "cursor-e-resize",
      "[data-collapsible=offcanvas]_&]": "-right-2",
    },
    "[[data-side=right]": {
      "[data-state=collapsed]_&]": "cursor-w-resize",
      "[data-collapsible=offcanvas]_&]": "-left-2",
    },
    "in-data-": {
      "[side=right]": "cursor-e-resize",
      "[side=left]": "cursor-w-resize",
    },
    "%": "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 sm:flex",
    "%transition": "transition-all ease-linear",
  }, className)}
  {...restProps}
>
  {@render children?.()}
</button>
