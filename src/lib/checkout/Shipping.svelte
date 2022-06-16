<script>
	import Input from '$lib/utils/Input.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		fetchCities,
		fetchProvinces,
		provinces,
		cities,
		fetchDistricts,
		districts,
		fetchSubDistricts,
		subDistricts
	} from '../../store/location';

	export let linkWa = '';
	export let isOrder;
	export let selected;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		await fetchProvinces();
	});

	 let addressShipping = {
		firstName: '',
		surName: '',
		province: null,
		kota: null,
		kecamatan: null,
		kelurahan: null,
		postalCode: '',
		detail: '',
		phone: ''
	};

	const getcities = async () => await fetchCities(addressShipping.province);
	const getdistricts = async () => await fetchDistricts(addressShipping.kota);
	const getsubDistricts = async () => await fetchSubDistricts(addressShipping.kecamatan);

	$: {
		if (addressShipping.province) {
			getcities();
		}
		if (addressShipping.kota) {
			getdistricts();
		}
		if (addressShipping.kecamatan) {
			getsubDistricts();
		}
	}
	$: console.log(addressShipping);
</script>

<h4 class="my-5 text-base font-medium">
	{selected === 'delivery' ? 'Shipping Address' : 'Pick Up Location'}
</h4>
<div class="flex flex-col text-xs font-medium text-gray-500">
	{#if selected === 'delivery'}
		<SelectItem title="User a New Address" options="[]" />
		<div class="flex space-x-3 items-center ">
			<Input name="" style="mb-2" placeholder="First name" bind:value={addressShipping.firstName} />
			<Input name="" style="mb-2" placeholder="Surname" bind:value={addressShipping.surName} />
		</div>
		<div class="flex space-x-3 items-center">
			<SelectItem
				name=""
				title="Province"
				options={$provinces}
				bind:value={addressShipping.province}
			/>
			<SelectItem
				name=""
				disabled={!addressShipping.province}
				title="Kota/Kab"
				options={$cities}
				bind:value={addressShipping.kota}
			/>
		</div>
		<div class="flex space-x-3 items-center">
			<SelectItem
				disabled={!addressShipping.kota}
				title="Kecamatan"
				name=""
				options={$districts}
				bind:value={addressShipping.kecamatan}
			/>
			<SelectItem
				name=""
				disabled={!addressShipping.kecamatan}
				title="Kelurahan"
				options={$subDistricts}
				bind:value={addressShipping.kelurahan}
			/>
		</div>
		<Input name="" style="mb-2" placeholder="Postal Code" value={addressShipping.postalCode} />
		<Input name="" style="mb-2" placeholder="Detail address" value={addressShipping.detail} />
		<Input name="" style="mb-2" placeholder="phone number" value={addressShipping.phone} />
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
		{:else if isOrder}
			<button disabled class="bg-slate-400 w-fi px-5 p-2 text-sm text-white rounded"
				><div class="flex items-center">
					<div
						class="border-dashed animate-spin  w-4 h-4 border-2 rounded-full mr-1"
						role="status"
					/>
					prepare ordering...
				</div>
			</button>
		{:else}
			<a
				href={linkWa}
				class=" w-fit bg-orange-600 px-5 p-2 text-sm text-white rounded"
				on:click={() => dispatch('order', addressShipping)}>Proceed Order</a
			>
		{/if}
		<p>Return to cart</p>
	</div>
	<hr class="mt-10" />
	<p class="py-5">Notation based on the Specified Commercial Transactions Law</p>
</div>
