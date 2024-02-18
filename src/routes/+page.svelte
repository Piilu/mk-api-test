<script lang="ts">
	import type { AxiosError } from 'axios';
	import Section from '$lib/components/section.svelte';
	import type { Payment, FormData } from '$lib/api/types';
	import {
		createTransactionLink,
		getData,
		getPaymentMethods,
		getPaymentStatus,
		saveData
	} from '$lib/api';
	import { useMutation, useQuery } from '@sveltestack/svelte-query';
	import type { PageServerData } from './$types';
	import Details from '$lib/components/details.svelte';

	//#region FormData
	let formData: FormData = getData() ?? {
		api_data: {
			url: 'https://api.test.maksekeskus.ee',
			payment_url: 'https://payment.test.maksekeskus.ee',
			shopId: '',
			secret: '',
			return_url: {
				url: 'http://localhost:5173/api/paymentStatus/',
				method: 'GET'
			},
			cancel_url: {
				url: 'http://localhost:5173/api/paymentStatus/',
				method: 'GET'
			},
			notification_url: {
				url: 'http://localhost:5173/api/paymentStatus/',
				method: 'POST'
			}
		},
		paymentData: {
			amount: 50.5,
			country: 'ee',
			locale: 'et'
		}
	};
	//#endregion

	const methods = useQuery<Payment, AxiosError>('methods', () => getPaymentMethods(formData), {
		enabled: formData.api_data.url !== '' && formData.api_data.secret != ''
	});

	const status = useMutation((id: string) => getPaymentStatus(formData, id));

	const countries = ['ee', 'lv', 'fi'];

	function redirect() {
		const url = createTransactionLink(formData);
		saveData(formData);
		window.location.replace(url);
	}

	function update() {
		saveData(formData);
		$methods.refetch();
	}

	export let data: PageServerData;
	if (data.props.id) {
		$status.mutate(data.props.id);
	}
</script>

<svelte:head>
	<title>Maksekeskus demo {data.props.id ? `| ${data.props.id}` : ''}</title>
</svelte:head>
{#if $status.data}
	<Details data={$status.data} />
{/if}

<div class="d-flex flex-column gap-5">
	<div class="accordion" id="api-data">
		<div class="accordion-item">
			<h2 class="accordion-header">
				<button
					class="accordion-button"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseOne"
					aria-expanded="true"
					aria-controls="collapseOne"
				>
					API andmed {#if formData.api_data.url}
						({formData.api_data.url})
					{/if}
				</button>
			</h2>
			<div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#api-data">
				<div class="accordion-body">
					<div class="row">
						<div class="mb-3">
							<label for="api-id" class="form-label">API url</label>
							<input
								bind:value={formData.api_data.url}
								type="text"
								class="form-control"
								id="api-id"
								placeholder="https://api..."
							/>
						</div>
						<div class="mb-3">
							<label for="payment-id" class="form-label">Payment url</label>
							<input
								bind:value={formData.api_data.payment_url}
								type="text"
								class="form-control"
								id="payment-id"
								placeholder="https://payment..."
							/>
						</div>
						<div class="mb-3 col-sm-6">
							<label for="shop-id" class="form-label">Shop ID</label>
							<input
								bind:value={formData.api_data.shopId}
								type="text"
								class="form-control"
								id="shop-id"
							/>
						</div>
						<div class="mb-3 col-sm-6">
							<label for="secret-id" class="form-label">Secret key</label>
							<input
								bind:value={formData.api_data.secret}
								type="text"
								class="form-control"
								id="secret-id"
							/>
						</div>
						<div class="mb-2 col-md-6">
							<label for="return-id" class="form-label">Return url</label>
							<input
								bind:value={formData.api_data.return_url.url}
								type="text"
								class="form-control"
								id="return-id"
							/>
						</div>
						<div class="mb-2 col-md-2">
							<label for="return-mehtod-id" class="form-label">Return method</label>
							<input
								bind:value={formData.api_data.return_url.method}
								type="text"
								class="form-control"
								id="return-mehtod-id"
							/>
						</div>
						<div class="mb-2 col-md-6">
							<label for="cancel-id" class="form-label">Cancel url</label>
							<input
								bind:value={formData.api_data.cancel_url.url}
								type="text"
								class="form-control"
								id="cancel-id"
							/>
						</div>
						<div class="mb-2 col-md-2">
							<label for="cancel-method-id" class="form-label">Cancel method</label>
							<input
								bind:value={formData.api_data.cancel_url.method}
								type="text"
								class="form-control"
								id="cancel-method-id"
							/>
						</div>
						<div class="mb-2 col-md-6">
							<label for="notify-id" class="form-label">Notification url</label>
							<input
								bind:value={formData.api_data.notification_url.url}
								type="text"
								class="form-control"
								id="notify-id"
							/>
						</div>
						<div class="mb-2 col-md-2">
							<label for="notify-method-id" class="form-label">Notification method</label>
							<input
								bind:value={formData.api_data.notification_url.method}
								type="text"
								class="form-control"
								id="notify-method"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Section name="Tehingu andmed">
		<div class="mb-2 col-md-12">
			<label for="amount-id" class="form-label">Summa</label>
			<input
				bind:value={formData.paymentData.amount}
				type="number"
				class="form-control"
				id="amount-id"
			/>
		</div>
		<div class="mb-2 col-md-12">
			<label for="reference-id" class="form-label">Viitenumber</label>
			<input
				bind:value={formData.paymentData.reference}
				type="text"
				class="form-control"
				id="reference-id"
			/>
		</div>
		<div class="mb-2 col-md-12">
			<label for="merchant-id" class="form-label">Mingid andmed</label>
			<textarea
				bind:value={formData.paymentData.merchant_data}
				class="form-control"
				id="merchant-id"
			/>
		</div>
		<h5>Vali makseviis:</h5>
		<ul class="nav nav-tabs">
			{#each countries ?? [] as country}
				<li class="nav-item px-2">
					<button
						on:click={() => {
							formData.paymentData.country = country;
							$methods.refetch();
						}}
						class={`${country == formData.paymentData.country && 'active'} nav-link`}
						>{country}</button
					>
				</li>
			{/each}
		</ul>

		<div class="d-flex flex-row gap-3 flex-wrap">
			{#each $methods.data?.banklinks ?? [] as item (item)}
				<button
					on:click={() => (formData.currentPayment = item)}
					class={`btn shadow ${item.name != formData.currentPayment?.name && 'muted'} hover-effect`}
				>
					<img src={item.logo_url} alt={item.display_name} />
				</button>
			{/each}
			{#if $methods.isLoading || $methods.isFetching}
				<div class="spinner-border m-auto" role="status"></div>
			{/if}
			{#if $methods.isError}
				<div class="m-auto text-center">
					<h5 class="text-danger">Something went wrong</h5>
					<p class="text-danger">Check your secrets</p>
				</div>
			{/if}
		</div>
	</Section>
	{#if $methods.isSuccess}
		<button on:click={redirect} class="btn btn-primary">Maksa</button>
	{:else}
		<button on:click={update} class="btn btn-primary">Uuenda andmeid</button>
	{/if}
</div>

<style>
	.hover-effect:hover {
		opacity: 1;
		transition: 0.2s;
	}
	.muted {
		opacity: 0.5;
	}
</style>
