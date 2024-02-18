<script lang="ts">
	export let name: string | undefined = '';
</script>

<div>
	<h4>{name}</h4>
	<hr class="my-1" />
	<slot />
</div>
