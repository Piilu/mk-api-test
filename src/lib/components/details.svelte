<script lang="ts">
	import type { TransactionStatus } from '$lib/api/types';

	export let data: TransactionStatus;
</script>

<div class="mb-5">
	<h5 class={`${data?.status === 'COMPLETED' ? 'text-success' : 'text-danger'}`}>
		STATUS: {data?.status}
	</h5>
</div>
