<script lang="ts">
  import { useSidebar } from "$lib/components/ui/sidebar";

  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";

  const sidebar = useSidebar();

  let openOnHoverChecked = $state(sidebar.openOnHover);

  const toggleOpenOnHover = () => {
    if (sidebar.open) {
      sidebar.toggle();
    }
    setTimeout(() => {
      sidebar.setOpenOnHover(openOnHoverChecked);
    }, 0);
  };
</script>

<div class="p-3">
  <h1 class="p-3 text-lg">Settings</h1>
  <label>
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={openOnHoverChecked}
      onclick={toggleOpenOnHover}
    />
    Open sidebar on hover
  </label>

  <div class="flex gap-3 p-3 items-center">
    <span>Toggle theme</span>
    <Button onclick={toggleMode} variant="outline" size="icon">
      <span
        class="icon-[lucide--sun] h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
      ></span>

      <span
        class="icon-[lucide--moon] absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
      ></span>
      <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</div>
