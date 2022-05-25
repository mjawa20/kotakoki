<script>
	import { slide } from 'svelte/transition';
import Input from '../utils/Input.svelte';
	export let handleShow;
</script>

<div class="mt-8" transition:slide>
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Add a new address</h1>
	<div class="flex justify-between gap-8">
		<Input name="Name" />
		<Input name="Surname" />
	</div>
	<Input name="Company Name" />
	<Input name="Address" />
	<Input name="Address" />
	<div class="flex justify-between gap-8">
		<Input name="Municipalities" />
		<Input name="Country / Region" />
	</div>
	<Input name="Prefectures" />
	<div class="flex justify-between gap-8">
		<Input name="Postal Code" />
		<Input name="Telephone Number" />
	</div>
	<label for="default" class="cursor-pointer">
		<input id="default" type="checkbox" />
		<span class="align-text-top text-sm font-medium">Set this address as the default </span>
	</label>
	<button class="w-fit block bg-amber-900 text-white p-3 rounded-sm text-sm font-medium mt-4"
		>Add an address</button
	>
	<button
		on:click={handleShow}
		class="w-fit block text-amber-900 rounded-sm text-base  hover:text-amber-700 my-4"
		>Cancel</button
	>
</div>
