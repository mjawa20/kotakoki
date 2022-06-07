<script context="module">
	export async function load({ params }) {
		const { id } = params;

		return { props: { id } };
	}
</script>

<script>
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import Detail from '$lib/collection/Detail.svelte';
	import { fetchProduct, products } from '../../../../store/product';
	import { postCart, carts } from '../../../../store/cart';
	import { onMount } from 'svelte';
	import { collections, fetchCollection } from '../../../../store/collection';
	import { getUserByEmail, users } from '../../../../store/user';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	export let id;

	let isUpload;
	let show;

	onMount(async () => await load());

	$: product = $products;
	$: collection = $collections;
	async function load() {
		await fetchProduct(id);
		await fetchCollection(product.collectionId);
		console.log(collection);
	}

	const handlePost = async (event) => {
		isUpload = true;

		let selectedProduct = event.detail;
		let newCart = {
			userId: $session.id,
			productId: selectedProduct.id,
			quantity: 1,
			total: 1 * selectedProduct.price
		};
		await postCart(newCart);
		show = false;
		await load();

		isUpload = false;
		goto('/cart');

	};

	$: breadcrumb = [
		{ name: 'Home', url: '/' },
		{ name: collection.name, url: `/collections/${collection.id}` },
		{ name: collection.name }
	];
</script>

<div class="mt-10">
	{#if product && collection}
		<Breadcrumb data={breadcrumb} />
		<div class="flex flex-col md:flex-row mt-8 gap-7">
			<div class="flex w-full md:w-4/6 gap-8 ">
				<img src="/assets/img/a.jpg" alt="" class="w-full max-h-80" />
				<div class="flex flex-col w-2/12 gap-3 ">
					<img src="/assets/img/c.jpg" alt="" />
					<img src="/assets/img/c.jpg" alt="" />
					<img src="/assets/img/c.jpg" alt="" />
				</div>
			</div>
			{#if product}
				<Detail {isUpload} {product} on:addCart={handlePost} />
			{/if}
		</div>
	{/if}
	<div class="mt-14">
		<h1 class="font-bold text-sm text-amber-900 mb-5">Recomendation for you</h1>
		<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
			<!-- <Product />
			<Product />
			<Product />
			<Product />
			<Product />
			<Product /> -->
		</div>
	</div>
</div>
