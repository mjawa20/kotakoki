<script>
	import Checkout from '$lib/checkout/Checkout.svelte';
	import Shipping from '$lib/checkout/Shipping.svelte';
	import Summary from '$lib/checkout/Summary.svelte';
	import { onMount } from 'svelte';

	import { carts, deleteCart, fetchCarts } from '../store/cart';

	import { session } from '$app/stores';

	let isShow = false;

	let items = [];

	onMount(async () => await load());

	async function load() {
		await fetchCarts({ selectors: 'userId', keyword: $session.id, op: 'eq' });
		items = [...$carts.rows];
	}

	$: if (innerWidth > 1024) {
		isShow = false;
	}
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<h1 class="font-medium text-2xl my-5 lg:hidden block text-center ">Kotakoki</h1>
<button on:click={() => (isShow = !isShow)} class="bg-zinc-50  py-5 lg:hidden border-y">
	<div class="max-w-md mx-auto flex justify-between ">
		<p class="text-sm">
			<i class="fab fa-opencart mr-2 text-base" />
			Order Summary / coupon input
			<i class="fas fa-angle-down align-middle" />
		</p>
		<p class="font-medium text-lg">¥ 1,100</p>
	</div>
</button>
<Summary {isShow} res={true} {items} />
<div class="w-full bg-white pt-10 lg:pt-14 lg:pr-10 px-5">
	<div class="max-w-md mx-auto lg:max-w-lg lg:ml-auto lg:mx-0">
		<h1 class="font-medium text-2xl mb-4 lg:block hidden">Kotakoki</h1>
		<Checkout />
		<Shipping />
	</div>
</div>
