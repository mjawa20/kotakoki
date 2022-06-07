<div class="text-amber-900">
	<div class="hidden md:flex gap-16 justify-end text-sm  font-bold ">
		<p>Price</p>
		<p>Quantity</p>
		<p>Total</p>
	</div>
	<hr class="mt-8" />
	<slot />
	<div class="text-right mt-8">
		<p class="text-sm">Subtotal <span class="font-bold ml-2">¥ 1,124</span></p>
		<i class="text-sm"
			>Shipping charges including tax will be calculated at the time of purchase.
		</i>
		<div class="mt-5">
			<button class="border border-amber-900 rounded-sm font-bold text-sm p-3"
				>Continue shopping</button
			>
			<button class="border border-amber-900 rounded-sm font-bold text-sm p-3">Update Cart</button>
			<a href="/payment" class="bg-amber-900 rounded-sm font-bold text-sm p-3 text-white mt-2"
				>To purchase procedure</a
			>
		</div>
	</div>
</div>
