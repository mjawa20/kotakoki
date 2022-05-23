<script>
	import Input from '$lib/utils/Input.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';
</script>

<h4 class="my-5 text-base font-medium">Delivery Method</h4>
<div class="flex flex-col text-xs font-medium text-gray-500">
	<SelectItem option="User a New Address" />
	<SelectItem option="country / region" />
	<div class="flex space-x-3 items-center ">
		<Input style="mb-2" placeholder="Surname" />
		<Input style="mb-2" placeholder="First name (optional)" />
	</div>
	<div class="flex space-x-3 items-center">
		<Input style="mb-2" placeholder="Postal Code" />
		<SelectItem option="Prefectures" />
	</div>
	<Input style="mb-2" placeholder="municipilities" />
	<Input style="mb-2" placeholder="address" />
	<Input style="mb-2" placeholder="address2" />
	<Input style="mb-2" placeholder="phone number" />
	<div class="flex gap-5 items-center my-5">
		<button class="w-fit bg-orange-600 px-5 p-2 text-sm text-white rounded"
			>Proceed to select shipping method</button
		>
		<p>Return to cart</p>
	</div>
    <hr class="mt-10">
    <p class="py-5">Notation based on the Specified Commercial Transactions Law</p>
</div>
