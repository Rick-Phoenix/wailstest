<script lang="ts">
  import { fcd, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLUListElement>> = $props();
</script>

<ul
  bind:this={ref}
  data-slot="sidebar-menu-sub"
  data-sidebar="menu-sub"
  class={fcd({
    "%border": "border-l border-sidebar-border",
    "%spacing": "mx-3.5 gap-1 px-2.5 py-0.5",
    "%":
      "min-w-0 translate-x-px flex-col group-data-[collapsible=icon]:hidden",
  }, className)}
  {...restProps}
>
  {@render children?.()}
</ul>
