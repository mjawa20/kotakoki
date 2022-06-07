<script>
	import Input from '$lib/utils/Input.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';

	export let linkWa = '';
	export let selected;
</script>

<h4 class="my-5 text-base font-medium">
	{selected === 'delivery' ? 'Shipping Address' : 'Pick Up Location'}
</h4>
<div class="flex flex-col text-xs font-medium text-gray-500">
	{#if selected === 'delivery'}
		<SelectItem option="User a New Address" />
		<SelectItem option="country / region" />
		<div class="flex space-x-3 items-center ">
			<Input style="mb-2" placeholder="First name" />
			<Input style="mb-2" placeholder="Surname" />
		</div>
		<div class="flex space-x-3 items-center">
			<Input style="mb-2" placeholder="Postal Code" />
			<SelectItem option="Prefectures" />
		</div>
		<Input style="mb-2" placeholder="municipilities" />
		<Input style="mb-2" placeholder="address" />
		<Input style="mb-2" placeholder="address2" />
		<Input style="mb-2" placeholder="phone number" />
	{:else}
		<div class="border inline-flex justify-between w-full font-medium text-gray-500 p-3">
			<div class="inline-flex">
				<input type="radio" checked />
				<div class="ml-4">
					<p class="text-sm">Jakarta Pusat</p>
					<p class="text-xs">Jl pejagalan nomer 45 43144</p>
				</div>
			</div>
			<div>
				<p class="text-sm">free</p>
				<p class="text-xs">Ready at 8am - 10pm</p>
			</div>
		</div>
	{/if}
	<div class="flex gap-5 items-center my-5">
		{#if linkWa === ''}
			<button disabled class="bg-slate-400 w-fi px-5 p-2 text-sm text-white rounded"
				>Proceed Order</button
			>
		{:else}
			<a href={linkWa} class=" w-fit bg-orange-600 px-5 p-2 text-sm text-white rounded"
				>Proceed Order</a
			>
		{/if}
		<p>Return to cart</p>
	</div>
	<hr class="mt-10" />
	<p class="py-5">Notation based on the Specified Commercial Transactions Law</p>
</div>
