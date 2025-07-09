<script lang="ts" module>
  import { tv, type VariantProps } from "tailwind-variants";

  export const sidebarMenuButtonVariants = tv({
    base: fcd({
      "[&>svg]": [
        "size-4",
        "shrink-0",
      ],
      "hover": [
        "bg-sidebar-accent",
        "text-sidebar-accent-foreground",
      ],
      "active": [
        "bg-sidebar-accent",
        "text-sidebar-accent-foreground",
      ],
      "data-": {
        "[active=true]": [
          "bg-sidebar-accent",
          "text-sidebar-accent-foreground",
          "font-medium",
        ],
        "[state=open]": {
          "hover": [
            "bg-sidebar-accent",
            "text-sidebar-accent-foreground",
          ],
        },
      },
      "group-data-": {
        "[collapsible=icon]": "size-8! p-2!",
      },
      "disabled": [
        "pointer-events-none",
        "opacity-50",
      ],
      "aria-disabled": [
        "pointer-events-none",
        "opacity-50",
      ],
      "group-has-data-[sidebar=menu-action]/menu-item": "pr-8",
      "%spacing": "p-2 gap-2",
      "%text": "text-left text-sm",
      "%border": [
        "outline-hidden",
        "ring-sidebar-ring",
        "focus-visible:ring-2",
        "rounded-md",
      ],
      "%layout": "flex w-full items-center",
      "%visibility": [
        "overflow-hidden",
        "[&>span:last-child]:truncate",
      ],
      "%": "peer/menu-button transition-[width,height,padding]",
    }),
    variants: {
      variant: {
        default: fcd({
          "hover": [
            "bg-sidebar-accent",
            "text-sidebar-accent-foreground",
          ],
        }),
        outline: fcd({
          "hover": {
            "bg-": "sidebar-accent",
            "text-": "sidebar-accent-foreground",
            "shadow-": "[0_0_0_1px_var(--sidebar-accent)]",
          },
          "shadow-": "[0_0_0_1px_var(--sidebar-border)]",
        }),
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "group-data-[collapsible=icon]:p-0! h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

  export type SidebarMenuButtonVariant = VariantProps<
    typeof sidebarMenuButtonVariants
  >["variant"];
  export type SidebarMenuButtonSize = VariantProps<
    typeof sidebarMenuButtonVariants
  >["size"];
</script>

<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import {
    cn,
    fcd,
    type WithElementRef,
    type WithoutChildrenOrChild,
  } from "$lib/utils.js";
  import { mergeProps } from "bits-ui";
  import type { ComponentProps, Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { useSidebar } from "./context.svelte.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    variant = "default",
    size = "default",
    isActive = false,
    tooltipContent,
    tooltipContentProps,
    ...restProps
  }:
    & WithElementRef<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & {
      isActive?: boolean;
      variant?: SidebarMenuButtonVariant;
      size?: SidebarMenuButtonSize;
      tooltipContent?: Snippet | string;
      tooltipContentProps?: WithoutChildrenOrChild<
        ComponentProps<typeof Tooltip.Content>
      >;
      child?: Snippet<[{ props: Record<string, unknown> }]>;
    } = $props();

  const sidebar = useSidebar();

  const buttonProps = $derived({
    class: cn(sidebarMenuButtonVariants({ variant, size }), className),
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "data-size": size,
    "data-active": isActive,
    ...restProps,
  });
</script>

{#snippet Button({ props }: { props?: Record<string, unknown> })}
  {@const mergedProps = mergeProps(buttonProps, props)}
  {#if child}
    {@render child({ props: mergedProps })}
  {:else}
    <button bind:this={ref} {...mergedProps}>
      {@render children?.()}
    </button>
  {/if}
{/snippet}

{#if !tooltipContent}
  {@render Button({})}
{:else}
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        {@render Button({ props })}
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Content
      side="right"
      align="center"
      hidden={sidebar.state !== "collapsed" || sidebar.isMobile}
      {...tooltipContentProps}
    >
      {#if typeof tooltipContent === "string"}
        {tooltipContent}
      {:else if tooltipContent}
        {@render tooltipContent()}
      {/if}
    </Tooltip.Content>
  </Tooltip.Root>
{/if}
