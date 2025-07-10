<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { cn, fcd, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { SIDEBAR_WIDTH_MOBILE } from "./constants.js";
  import { useSidebar } from "./context.svelte.js";

  interface SidebarProps {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    openOnHover?: Boolean;
  }

  let {
    ref = $bindable(null),
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    class: className,
    children,
    openOnHover,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & SidebarProps =
    $props();

  const isFloatingOrInset = variant === "floating" || variant === "inset";
  const sidebarState = useSidebar();
</script>

{#if collapsible === "none"}
  <div
    class={cn(
      "bg-sidebar text-sidebar-foreground w-(--sidebar-width) h-full flex-col",
      className,
    )}
    bind:this={ref}
    {...restProps}
  >
    {@render children?.()}
  </div>
{:else if sidebarState.isMobile}
  <Sheet.Root
    bind:open={() => sidebarState.openMobile, (v) => sidebarState.setOpenMobile(v)}
    {...restProps}
  >
    <Sheet.Content
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      class="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
      style="--sidebar-width: {SIDEBAR_WIDTH_MOBILE}"
      {side}
    >
      <Sheet.Header class="sr-only">
        <Sheet.Title>Sidebar</Sheet.Title>
        <Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
      </Sheet.Header>
      <div class="size-full flex-col">
        {@render children?.()}
      </div>
    </Sheet.Content>
  </Sheet.Root>
{:else}
  <div
    bind:this={ref}
    class="text-sidebar-foreground group peer hidden md:block"
    data-state={sidebarState.state}
    data-collapsible={sidebarState.state === "collapsed" ? collapsible : ""}
    data-variant={variant}
    data-side={side}
    data-slot="sidebar"
    role="navigation"
    onmouseenter={openOnHover && (() => {
      if (!sidebarState.pinned) {
        sidebarState.setOpen(true);
      }
    })}
    onmouseleave={openOnHover && (() => {
      if (!sidebarState.pinned) {
        sidebarState.setOpen(false);
      }
    })}
    {...restProps}
  >
    <!-- This is what handles the sidebar gap on desktop -->
    <div
      data-slot="sidebar-gap"
      class={fcd({
        "group-data-": {
          "[collapsible=icon]": isFloatingOrInset
            ? "w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "w-(--sidebar-width-icon)",
          "[collapsible=offcanvas]": "w-0",
          "[side=right]": "rotate-180",
        },
        "%": [
          "w-(--sidebar-width) relative bg-transparent",
        ],
        "%transitions": ["transition-[width] duration-200 ease-linear"],
      })}
    >
    </div>
    <div
      data-slot="sidebar-container"
      class={[
        fcd({
          "group-data-": {
            "[collapsible=offcanvas]": side === "left"
              ? "left-[calc(var(--sidebar-width)*-1)]"
              : "right-[calc(var(--sidebar-width)*-1)]",
            "[collapsible=icon]": isFloatingOrInset
              ? "w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
              : "w-(--sidebar-width-icon)",
            "[side=left]": isFloatingOrInset ? "border-r" : "",
            "[side=right]": isFloatingOrInset ? "border-l" : "",
          },
          "p-2": isFloatingOrInset,
          "%": [side === "left" ? "left-0" : "right-0"],
        }, className),
      ]}
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        class={fcd({
          "group-data-[variant=floating]": [
            "shadow-sm",
            "border",
            "rounded-lg",
            "border-sidebar-border",
          ],
          "%": "bg-sidebar size-full flex-col",
        })}
      >
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
