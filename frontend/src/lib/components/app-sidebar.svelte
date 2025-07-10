<script lang="ts">
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  const items = [
    {
      title: "Home",
      url: "/",
      icon: HouseIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: InboxIcon,
    },
  ];
</script>

<Sidebar.Root
  variant="inset"
  collapsible="icon"
  side="left"
>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
