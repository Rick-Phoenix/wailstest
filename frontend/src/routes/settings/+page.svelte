<script lang="ts">
  import { useSidebar } from "$lib/components/ui/sidebar";

  const sidebar = useSidebar();
</script>

<label>
  <input type="checkbox" bind:checked={sidebar.openOnHover} />
  Open sidebar on hover
</label>
