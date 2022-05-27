<script>
	import { createEventDispatcher } from 'svelte';

	import { fly } from 'svelte/transition';

	export let show = false;
	export let title;
	export let clear;
	export let methodType;
	export let isUpload = false;
	export let submitDisable = true;

	const handleShow = () => {
		show = true;
		methodType = 'post';
	};

	const close = () => {
		show = false;
		clear();
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
			class="absolute bg-white w-screen left-0 top-0 h-screen z-50 max-w-lg sm:w-96 sm:h-fit sm:shadow-md sm:mb-10 sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 backdrop-blur-xl "
		>
			<div class="border-b flex justify-between font-bold p-5 ">
				<h2>Add {title}</h2>
				<button class="cursor-pointer" on:click={close} disabled={isUpload}>&#x2715</button>
			</div>
			<slot />
			<div class="flex px-5 py-10 gap-2 justify-end">
				<button
					disabled={isUpload}
					on:click={close}
					type="button"
					class="disabled:border-slate-400 inline-block px-6 py-1.5 border-2 border-gray-400 text-gray-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
					>cancel</button
				>
				{#if !isUpload}
					<button
						disabled={submitDisable}
						on:click={() => {
							dispatch('submit');
							clear();
						}}
						type="button"
						class="disabled:bg-slate-400 inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						>Submit</button
					>
				{:else}
					<button
						disabled={isUpload}
						type="button"
						class="disabled:bg-slate-400 inline-block px-6 py-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md "
					>
						{#if isUpload}
							<div class="flex items-center">
								<div
									class="border-dashed animate-spin  w-4 h-4 border-2 rounded-full mr-1"
									role="status"
								/>
								Saving
							</div>
						{:else}
							submit
						{/if}
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
