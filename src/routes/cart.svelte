<script>
	import CartItem from '$lib/cart/CartItem.svelte';
	import CartList from '$lib/cart/CartList.svelte';
	import { onMount } from 'svelte';
	import Alert from '../lib/utils/Alert.svelte';
	import Confirm from '../lib/utils/Confirm.svelte';
	import { carts, deleteCart, fetchCarts } from '../store/cart';
	import { fetchProducts, products } from '../store/product';
	import { session } from '$app/stores';

	let items;

	let showConfirm = false;

	let typeAlert = '';
	let messageAlert = '';
	let isShowAlert = false;
	$: selectedId = 0;

	onMount(async () => await load());
	async function load() {
		await fetchCarts({ selectors: 'userId', keyword: $session.id, op: 'eq' });

		items = [...$carts.rows];
	}

	const showAlert = (message, type) => {
		isShowAlert = true;
		messageAlert = message;
		typeAlert = type;

		setTimeout(() => {
			isShowAlert = false;
		}, 3000);
	};

	const handleDelete = async () => {
		await deleteCart(selectedId);
		await load();
		console.log(selectedId);
		showAlert('Delete Data Successfully', 'success');
	};
</script>

<Confirm bind:showConfirm onDelete={handleDelete} />
<Alert type={typeAlert} show={isShowAlert} message={messageAlert} />
<div class="mt-10">
	<h1 class="font-bold text-2xl text-amber-900 mb-8">Your cart</h1>
	{#if items}
		{#if items.length > 0}
			<CartList>
				{#each items as item}
					<CartItem
						{item}
						on:delete={() => {
							showConfirm = true;
							selectedId = item.id;
						}}
					/>
				{/each}
			</CartList>
		{:else}
			<div class="text-center">
				<p class="mb-5">Carts item is empty</p>
				<a class="bg-amber-900 text-white px-8 py-3 text-sm rounded" href="/"
					>Continue to buy any our product?</a
				>
			</div>
		{/if}
	{:else}
		<div class="border-b flex flex-col md:flex-row justify-between py-8">
			<div class="flex gap-8 max-w-lg">
				<div class="border animate-pulse bg-slate-300 w-40 h-40" />
				<div>
					<div class="animate-pulse rounded bg-slate-300 h-4 w-32 mb-2" />
					<div class="animate-pulse rounded bg-slate-300 h-4 w-32" />
				</div>
			</div>

			<div
				class="md:hidden text-right flex gap-16 md:justify-end justify-between items-center text-xs h-fit my-4"
			>
				<div class="animate-pulse rounded bg-slate-300 h-4 w-32 mb-2" />
				<div class="animate-pulse rounded bg-slate-300 h-4 w-32" />
				<div class="animate-pulse rounded bg-slate-300 h-4 w-32" />
			</div>
			<div
				class=" text-right flex gap-16 md:justify-end justify-between items-center text-sm  font-bold h-fit md:w-96"
			>
				<div class="animate-pulse rounded bg-slate-300 h-4 w-32 mb-2" />
				<div class="animate-pulse rounded bg-slate-300 h-4 w-32" />
				<div class="animate-pulse rounded bg-slate-300 h-4 w-32" />
			</div>
		</div>
	{/if}
</div>
