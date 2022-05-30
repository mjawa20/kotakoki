<script context="module">
	export async function load({ params }) {
		const { id } = params;

		return { props: { id } };
	}
</script>

<script>
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import Detail from '$lib/collection/Detail.svelte';
	import Product from '$lib/collection/Product.svelte';
	import axios from 'axios';
	import { fetchProduct, products } from '../../../../store/product';
	import { onMount } from 'svelte';
	import { collections, fetchCollection } from '../../../../store/collection';

	export let id;

	onMount(async () => await load());
	
	$: product = $products;
	$: collection = $collections;
	async function load() {
		console.log('...................');
		await fetchProduct(id);
		await fetchCollection(product.collectionId);
		console.log(product);
		console.log(collection);
	}
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
		<Detail {product} />
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
