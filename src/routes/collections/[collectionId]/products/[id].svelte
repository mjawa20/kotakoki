<script context="module">
	export async function load({ params }) {
		const { id } = params;
		let product;
		try {
			const res = await axios.get(`/api/product/${id}`);
			product = await res.data.data;
		} catch (error) {
			console.log(error);
		}
		return { props: { product } };
	}
</script>

<script>
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import Detail from '$lib/collection/Detail.svelte';
	import Product from '$lib/collection/Product.svelte';
	import axios from 'axios';

	export let product;
</script>

<div class="mt-10">
	<Breadcrumb />
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
