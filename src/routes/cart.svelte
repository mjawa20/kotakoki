<script>
	import CartItem from '$lib/cart/CartItem.svelte';
	import CartList from '$lib/cart/CartList.svelte';
</script>

<div class="mt-10">
	<h1 class="font-bold text-2xl text-amber-900 mb-8">Your cart</h1>
	<CartList>
		<CartItem />
	</CartList>
</div>
