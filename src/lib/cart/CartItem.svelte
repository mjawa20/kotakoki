<script>
	import { createEventDispatcher } from 'svelte';

	export let item;
	export let product;

	let qtyValue = item.quantity;

	const dispatch = createEventDispatcher();

	$: {
		if (qtyValue < 0) {
			qtyValue = 1;
		}
	}
	$: total = qtyValue * product.price;
</script>

<div class="border-b flex flex-col md:flex-row justify-between py-8">
	<div class="flex gap-8 max-w-lg">
		<img src="/assets/img/a.jpg" alt="" class="w-5/12    " />
		<div>
			<h1 class="font-bold text-sm">{product.name}</h1>
			<p class="cursor-pointer text-sm mt-2" on:click={() => dispatch('delete')}>Delete</p>
		</div>
	</div>

	<div class="md:hidden flex gap-16 md:justify-end justify-between items-center text-xs h-fit my-4">
		<p>Price</p>
		<p>Quantity</p>
		<p>Total</p>
	</div>
	<div class="flex gap-16 md:justify-end justify-between items-center text-sm  font-bold h-fit ">
		<p>¥ {product.price}</p>
		<input type="text" class="w-14 h-fit border p-2 rounded-sm" bind:value={qtyValue} />
		<p>¥ {total}</p>
	</div>
</div>
