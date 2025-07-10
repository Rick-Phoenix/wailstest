<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<ModeWatcher defaultTheme="dark" />
<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <main>
      <Sidebar.Trigger />
      {@render children?.()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
