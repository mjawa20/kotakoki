<script context="module">
	export async function load({ params }) {
		const { collectionId } = params;
		return { props: { collectionId } };
	}
</script>

<script>
	import axios from 'axios';

	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';
	import CollectionSkel from '$lib/skeleton/CollectionSkel.svelte';
	import Product from '$lib/collection/Product.svelte';
	import { fetchProducts, products } from '../../../store/product';
	import { onMount } from 'svelte';
	import { fetchCollections, collections, fetchCollection } from '../../../store/collection';
	export let collectionId;

	let rowCollection = {};
	$: rowsproduct = [];

	onMount(async () => {
		await load();
	});
	async function load(_page) {
		await fetchProducts();
		await fetchCollection(collectionId);
		rowCollection = $collections;
		rowsproduct = $products.rows;
	}
	$: {
		if (rowsproduct) {
			rowsproduct = rowsproduct.filter((item) => item.collectionId == rowCollection.id);
		}
	}

	$: breadcrumb = [{ name: 'Home', url: '/' }, { name: rowCollection.name }];
</script>

<div class="mt-10">
	{#if Object.keys(rowCollection).length > 0}
		<Breadcrumb data={breadcrumb} />
		<div class="flex flex-col md:flex-row md:justify-between md:items-center  my-7 ">
			<h1 class="font-bold text-2xl text-amber-900">{rowCollection.name}</h1>
			<div class="flex  gap-4 mt-5 md:mt-0">
				<SelectItem name="Browse" />
				<SelectItem name="Sort" />
			</div>
		</div>
		{#if rowsproduct}
			<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
				{#each rowsproduct as product}
					<Product {product} />
				{/each}
			</div>
		{:else}
			<h1 class="w-full text-center">Collection is Empty</h1>
		{/if}
	{:else}
		<CollectionSkel />
	{/if}
</div>
