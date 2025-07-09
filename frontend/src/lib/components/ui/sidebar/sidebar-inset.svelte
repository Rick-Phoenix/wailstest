<script lang="ts">
  import { fcd, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<main
  bind:this={ref}
  data-slot="sidebar-inset"
  class={fcd({
    "md": {
      "peer-data-[variant=inset]": [
        "m-2",
        "ml-0",
        "rounded-xl",
        "shadow-sm",
        "peer-data-[state=collapsed]:ml-2",
      ],
    },
    "%": "bg-background relative flex w-full flex-1 flex-col",
  }, className)}
  {...restProps}
>
  {@render children?.()}
</main>
