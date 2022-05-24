<script context="module">
	export async function load({ params }) {
  try {
		const { collectionId } = params;
		let collection;
		try {
			const res = await axios.get(`/api/collection/${collectionId}`);
			collection = await res.data.data;
		} catch (error) {
			console.log(error);
		}
		return { props: { collection } };
	}
</script>

<script>
	import axios from 'axios';

	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import CollectionItem from '$lib/collection/CollectionItem.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';
	import CollectionSkel from '$lib/skeleton/CollectionSkel.svelte';
	import Product from '$lib/collection/Product.svelte';

	export let collection;
	console.log(collection);
</script>

<div class="mt-10">
	<Breadcrumb />
	{#if collection}
		<div class="flex justify-between items-center  my-7 ">
			<h1 class="font-bold text-2xl text-amber-900">{collection.name}</h1>
			<div class="flex  gap-4">
				<SelectItem name="Browse" />
				<SelectItem name="Sort" />
			</div>
		</div>
		<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
			<Product />
			<Product />
			<Product />
			<Product />
		</div>
	{:else}
		<CollectionSkel />
	{/if}
</div>
