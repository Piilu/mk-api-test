<script lang="ts">
	import NavBar from '$lib/components/nav-bar.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<NavBar />
	<div class="container py-2">
		<slot />
	</div>
</QueryClientProvider>
