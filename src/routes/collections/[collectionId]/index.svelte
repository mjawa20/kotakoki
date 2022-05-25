<script context="module">
	export async function load({ params }) {
		const { collectionId } = params;
		let collection;
		try {
			const res = await axios.get(`/api/collection/${collectionId}`);
			collection = await res.data.data;
		} catch (error) {
			console.log('catch errror');
		}
		return { props: { collection } };
	}
</script>

<script>
	import axios from 'axios';

	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';
	import CollectionSkel from '$lib/skeleton/CollectionSkel.svelte';
	import Product from '$lib/collection/Product.svelte';
	import { product } from '../../../store/productstore';
	export let collection;
	let filteredProduct = [];
	console.log(collection);

	filteredProduct = $product.filter((item) => item.collectionId == collection.id);
	console.log(filteredProduct);
</script>

<div class="mt-10">
	<Breadcrumb />
	{#if collection}
		<div class="flex flex-col md:flex-row md:justify-between md:items-center  my-7 ">
			<h1 class="font-bold text-2xl text-amber-900">{collection.name}</h1>
			<div class="flex  gap-4 mt-5 md:mt-0">
				<SelectItem name="Browse" />
				<SelectItem name="Sort" />
			</div>
		</div>
		{#if filteredProduct.length}
			<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
				{#each filteredProduct as product}
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
