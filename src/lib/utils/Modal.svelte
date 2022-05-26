<script>
	import { createEventDispatcher } from 'svelte';

	import { fly } from 'svelte/transition';

	export let show = false;
	export let title;
	const handleShow = () => {
		show = true;
	};

	const close = () => {
		show = false;
	};

	const dispatch = createEventDispatcher();
</script>

<button
	on:click={handleShow}
	class="bg-blue-400 px-5 py-2 text-sm ml-3 text-white rounded font-medium active:bg-blue-800 active:shadow-lg hover:bg-blue-500 hover:shadow-lg"
	>Add {title}</button
>
{#if show}
	<div class=" bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 ">
		<div
			transition:fly={{ y: 200, duration: 400 }}
			class="absolute bg-white w-screen left-0 top-0 h-screen z-50 min-w-max sm:w-96 sm:h-fit sm:shadow-md sm:mb-10 sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 backdrop-blur-xl "
		>
			<div class="border-b flex justify-between font-bold p-5 ">
				<h2>Add {title}</h2>
				<p class="cursor-pointer" on:click={close}>&#x2715</p>
			</div>
			<slot />
			<div class="px-5 py-10 text-right">
				<button
					on:click={close}
					type="button"
					class="inline-block px-6 py-1.5 border-2 border-gray-400 text-gray-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
					>cancel</button
				>
				<button
					on:click={() => dispatch('submit')}
					type="button"
					class="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
					>submit</button
				>
			</div>
		</div>
	</div>
{/if}
