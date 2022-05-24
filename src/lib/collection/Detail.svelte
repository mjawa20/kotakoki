<script>
	export let product;
</script>

<div class="text-amber-900 max-w-sm w-full">
	<h2 class="text-lg font-bold">Kotakoki</h2>
	<h1 class="text-3xl font-bold ">{product.name}</h1>
	<h2 class="text-xl font-bold my-3">¥ 1,620</h2>
	<h2 class="text-sm ">tax include</h2>
	<div class="my-12 ">
		<button class="block border border-amber-900 w-3/6 py-2 mb-2">Add to cart</button>
		<button class="bg-amber-900 text-white w-3/6 py-2 block">Buy Now</button>
	</div>
	<div>
		{product.description}
	</div>
</div>
