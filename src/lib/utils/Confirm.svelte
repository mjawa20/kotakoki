<script>
	import { fly } from 'svelte/transition';
	export let showConfirm;

	export let confirm;

	const close = () => {
		showConfirm = false;
		clear();
	};
</script>

{#if showConfirm}
	<div
		transition:fly={{ y: -200, duration: 400 }}
		class="absolute shadow-2xl bg-white w-screen left-0 top-0 h-screen z-50 max-w-lg sm:w-96 sm:h-fit sm:shadow-md sm:mb-10 sm:left-1/2 sm:-translate-x-1/2 sm:top-28 sm:-translate-y-1/2 backdrop-blur-xl "
	>
		<div class="border-b flex justify-between font-bold p-5 ">Confirmation</div>
		<p class="p-5">Are You Sure To Delete this data?</p>
		<div class="px-5 py-5 text-right">
			<button
				on:click={close}
				type="button"
				class="inline-block px-6 py-1.5 border-2 border-gray-400 text-gray-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
				>No</button
			>

			<button
				on:click={() => {
					confirm = true;
					showConfirm = false;
				}}
				type="button"
				class="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
				>Yes</button
			>
		</div>
	</div>
{/if}
