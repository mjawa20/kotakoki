<script>
	export let item;
</script>

<div class="flex justify-between items-center mb-5 text-sm font-medium">
	<div class="inline-flex space-x-4 items-center">
		<div class="relative w-fit ">
			<img src="/assets/img/a.jpg" alt="" class="w-16 rounded-md" />
			<p
				class="-top-2 -right-1 text-xs font-bold absolute bg-gray-600 rounded-full flex items-center justify-center h-5 w-5 text-center text-white"
			>
				{item.quantity}
			</p>
		</div>
		<p>{item.product.name}</p>
	</div>
	<p>¥ {item.total}</p>
</div>
