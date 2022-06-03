<script>
	import NavRes from './NavRes.svelte';
	import { fetchCarts, carts } from '../../store/cart';
	import { onMount } from 'svelte';
	import * as cookie from 'cookie';
	let isShow = false;

	onMount(async () => {
		fetchCarts();
	});

	$: if (innerWidth > 768) {
		isShow = false;
	}
	$: innerWidth = 0;

	// $: auth = cookie.parse(event.request.headers.get('cookie') || '');
</script>

<svelte:window bind:innerWidth />

<nav class="bg-amber-50 py-3">
	<div class="flex flex-col justify-between px-7 md:mx-auto max-w-5xl md:flex-row">
		<h1
			class="text-amber-900  font-bold  text-xs md:w-80 w-full leading-6 md:text-left text-center mb-4 md:mb-0"
		>
			Shopping at KOTAKOKI will be even easier! The pricing system has changed so that all products
			are displayed at tax-included prices.
		</h1>
		<div class="hidden md:flex items-center text-xs text-amber-900 gap-2 font-bold">
			{#if false}
				<a rel="external" href="/login">my account</a>
				<a rel="external" href="/login">Logout</a>
			{:else}
				<a rel="external" href="/login">Login</a>
				<span>or</span>
				<a rel="external" href="/register">Create an Account</a>
			{/if}
			<a href="/cart" class="mx-3"
				><i class="fas fa-cart-arrow-down mr-1" />
				Cart
				{#if $carts.count}
					: 2
				{/if}
			</a>
			<label class="relative block">
				<span class="absolute inset-y-0 left-1 flex items-center pl-2">
					<i class="fas fa-search text-gray-600" />
				</span>
				<input
					class=" placeholder:text-slate-400 block bg-white w-32 border rounded-md py-1 pl-9 pr-3 shadow-sm  text-xs"
					placeholder="Search"
					type="text"
					name="search for"
				/>
			</label>
		</div>
		<div class="flex justify-between text-sm text-amber-900 font-medium  md:hidden ">
			<button on:click={() => (isShow = !isShow)} class=" font-medium"
				><i class="fas fa-bars mr-1" /> menu</button
			>
			<a href="/cart"><i class="fas fa-cart-arrow-down mr-1" /> Cart(2)</a>
		</div>
	</div>

	<NavRes {isShow} />
</nav>
