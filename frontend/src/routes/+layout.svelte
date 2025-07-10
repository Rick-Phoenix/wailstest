<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import "../app.css";
  import type { Side } from "$lib/components/ui/sidebar/context.svelte";

  let { children } = $props();
  let sidebarSide = $state<Side>("right");
</script>

<ModeWatcher defaultTheme="dark" />
<Sidebar.Provider bind:side={sidebarSide}>
  <AppSidebar />
  <Sidebar.Inset>
    <main>
      <Sidebar.Trigger />
      {@render children?.()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
