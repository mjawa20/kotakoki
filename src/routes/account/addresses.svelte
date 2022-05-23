<script>
	import AddressItem from '$lib/account/AddressItem.svelte';
	import FormAdress from '$lib/account/FormAdress.svelte';

	let isShow = false;
	const handleShow = () => {
		isShow = !isShow;
	};
</script>

<div class="mt-10 text-amber-900">
	<div class="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
		<h1 class="font-bold text-2xl text-amber-900 ">My Account</h1>
		<button
			on:click={handleShow}
			class="bg-amber-900 px-4 py-3 text-white text-sm font-bold w-fit mt-5 md:mt-0"
			>Add a new address</button
		>
	</div>
	<a href="/" class="text-base">Return to account details</a>
	{#if isShow}
		<FormAdress {handleShow} />
	{/if}
	<div class="mt-8">
		<h1 class="font-bold text-2xl text-amber-900 mb-5">Your Address</h1>
		<AddressItem />
		<AddressItem />
	</div>
</div>
