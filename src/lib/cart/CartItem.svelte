<script>
	import { createEventDispatcher } from 'svelte';

	export let item;

	let qtyValue = item.quantity;

	const dispatch = createEventDispatcher();

	$: {
		if (qtyValue < 0) {
			qtyValue = 1;
		}else if(qtyValue > 100){
			qtyValue = 100;
		}
	}
	$: total = qtyValue * item.product.price;
</script>

<div class="border-b flex flex-col md:flex-row justify-between py-8">
	<div class="flex gap-8 max-w-lg">
		<img src="/assets/img/a.jpg" alt="" class="w-5/12" />
		<div>
			<h1 class="font-bold text-sm">{item.product.name}</h1>
			<p class="cursor-pointer text-sm mt-2" on:click={() => dispatch('delete')}>Delete</p>
		</div>
	</div>

	<div class="md:hidden text-right flex gap-16 md:justify-end justify-between items-center text-xs h-fit my-4">
		<p>Price</p>
		<p>Quantity</p>
		<p>Total</p>
	</div>
	<div class=" text-right flex gap-16 md:justify-end justify-between items-center text-sm  font-bold h-fit md:w-96" >
		<p class="w-full ">¥ {item.product.price}</p>
		<input type="number" class="text-right w-14 h-fit border p-2 rounded-sm" bind:value={qtyValue} max={100} />
		<p class="w-full border">¥ {total}</p>
	</div>
</div>
