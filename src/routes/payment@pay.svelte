<script>
	import Checkout from '$lib/checkout/Checkout.svelte';
	import Shipping from '$lib/checkout/Shipping.svelte';
	import Summary from '$lib/checkout/Summary.svelte';
	import { onMount } from 'svelte';

	import { carts, fetchCarts } from '../store/cart';
	import { postOrder } from '../store/order';
	import { postOrderItem } from '../store/orderItem';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { filterCart, linkWABuilder } from '../utils';
	import { uid } from 'uid';

	let isShow = false;
	let selected = 'pick-up';
	let items = [];

	let isOrder = false;

	onMount(async () => await load());

	async function load() {
		await fetchCarts({ selectors: 'userId', keyword: $session.id, op: 'eq' });
		items = [...$carts.rows];
		if (!items.length) {
			alert('nothing item to checkout, you will redirect');
			goto('/cart');
		}
	}
	
	function select(event) {
		selected = event.detail;
	}
	
	const handleOrder = async () => {
		isOrder = true;
		let newOrder = {
			userId: $session.id,
			code: uid()
		};
		let res = await postOrder(newOrder);
		await postOrderItem(filterCart(items,res.id));

		isOrder = false;
	};	
	
	$: if (innerWidth > 1024) {
		isShow = false;
	}
	$: innerWidth = 0;

	let linkWa = '';
	let numberWa = '628889988618';
	let address = '';
	$: total = items.reduce((a, b) => a + b.total, 0);
	$: {
		if (items.length) {
			linkWa = linkWABuilder(items, total, numberWa, selected, address);
		}
	}
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
		<p class="font-medium text-lg">¥ {total}</p>
	</div>
</button>
<Summary {isShow} res={true} {items} {total} />
<div class="w-full bg-white pt-10 lg:pt-14 lg:pr-10 px-5">
	<div class="max-w-md mx-auto lg:max-w-lg lg:ml-auto lg:mx-0">
		<h1 class="font-medium text-2xl mb-4 lg:block hidden">Kotakoki</h1>
		<Checkout on:select={select} {selected} />
		<Shipping {linkWa} {selected} on:order={handleOrder} {isOrder} />
	</div>
</div>
<Summary res={false} {items} {total} />
