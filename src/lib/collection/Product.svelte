<script>
	export let product;

</script>

<a href="/collections/{product.collectionId}/product/{product.id}">
	<img src="/assets/img/download.jpg" alt="" class="w-full hover:opacity-70" />
	<p class="text-amber-900 text-sm font-semibold mt-3">{product.name}</p>
	<p class="text-amber-900 text-xs font-medium mt-2">¥ {product.price}</p>
</a>
