<script>
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import Shipping from '$lib/checkout/Shipping.svelte';
	import Summary from '$lib/checkout/Summary.svelte';
</script>

<!-- <Breadcrumb color="text-gray-600" /> -->
<h4 class="my-5 text-base font-medium">Contact Information</h4>
<div class="flex space-x-3 text-xs items-center font-medium">
	<img src="/assets/img/a.jpg" alt="" class="rounded w-12" />
	<div>
		<p>Full Name (Email Address)</p>
		<p class="text-500 font-normal">Log Out</p>
	</div>
</div>
<label for="default" class="cursor-pointer flex items-center mt-4 ">
	<input id="default" type="checkbox" class="w-4 h-4" />
	<p class="ml-2 text-sm">Set this address as the default</p>
</label>
<h4 class="my-5 text-base font-medium">Delivery Method</h4>
<div class="flex flex-col text-xs font-medium text-gray-500">
	<label class="inline-flex items-center border-x border-t p-4">
		<input type="radio" class="form-radio" name="radio" value="1" checked />
		<span class="ml-2"><i class="fas fa-truck mr-1" /> Send</span>
	</label>
	<hr />
	<label class="inline-flex items-center border-x border-b p-4">
		<input type="radio" class="form-radio" name="radio" value="2" />
		<span class="ml-2"><i class="fas fa-store mr-1" /> Send</span>
	</label>
</div>
