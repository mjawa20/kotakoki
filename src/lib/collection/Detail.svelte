<script>
	import { createEventDispatcher } from 'svelte';

	export let product;
	export let isUpload;
	const dispatch = createEventDispatcher();
</script>

<div class="text-amber-900 max-w-sm w-full">
	<h2 class="text-lg font-bold">Kotakoki</h2>
	<h1 class="text-3xl font-bold ">{product.name}</h1>
	<h2 class="text-xl font-bold my-3">¥ {product.price}</h2>
	<h2 class="text-sm ">tax include</h2>
	<div class="my-12 ">
		<button
			disabled={isUpload}
			class="disabled:bg-slate-400 block border border-amber-900 w-3/6 py-2 mb-2"
			on:click={() => dispatch('addCart', product)}
		>
			{#if isUpload}
				<div class="flex items-center">
					<div
						class="border-dashed animate-spin  w-4 h-4 border-2 rounded-full mr-1"
						role="status"
					/>
					Adding...
				</div>
			{:else}
				Add To Cart
			{/if}
		</button>
		<button class="bg-amber-900 text-white w-3/6 py-2 block">Buy Now</button>
	</div>
	<div>
		{product.description}
	</div>
</div>
