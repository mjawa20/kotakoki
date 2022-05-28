<script>
	import { fly } from 'svelte/transition';

	export let showDetail;
	export let row;
	export let clear;
	const handleClose = () => {
		showDetail = false;
		clear();
	};
</script>

{#if showDetail}
	<div class=" bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 ">
		<div
			transition:fly={{ y: 200, duration: 400 }}
			class="absolute bg-white w-screen left-0 top-0 h-screen z-50 max-w-lg sm:w-96 sm:h-fit sm:shadow-md sm:mb-10 sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 backdrop-blur-xl "
		>
			<div class="border-b flex justify-between font-bold p-5 ">
				<h2>Detail Product</h2>
				<p class="cursor-pointer" on:click={handleClose}>&#x2715</p>
			</div>
			<div class="p-5">
				<div class="flex flex-col items-center mt-4 font-normal">
					<p class="font-bold">{row.name}</p>
					<p class="font-medium">{row.id}</p>
				</div>
				<div class="flex justify-between mt-4 font-normal">
					<p>Price</p>
					<p class="font-medium">¥ {row.price}</p>
				</div>
				<div class="flex justify-between mt-4 font-normal">
					<p>Category</p>
					<p class="font-medium">{row.categoryId}</p>
				</div>
				<div class="flex justify-between mt-4 font-normal">
					<p>Collection</p>
					<p class="font-medium">{row.collectionId}</p>
				</div>
				<p class="mt-3 whitespace-normal break-words text-base font-normal opacity-75 ">
					{row.description}
				</p>
			</div>
		</div>
	</div>
{/if}
