<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { fcd, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="sidebar-content"
  data-sidebar="content"
  class={fcd({
    "%layout": [
      "flex-col",
      "flex-1",
      "gap-2",
      "min-h-0",
    ],
    "%visibility": [
      "overflow-auto",
      "group-data-[collapsible=icon]:overflow-hidden",
    ],
  }, className)}
  {...restProps}
>
  {@render children?.()}
</div>
