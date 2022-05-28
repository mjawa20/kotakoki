<script>
	import { fly } from 'svelte/transition';

	export let type;
	export let showConfirm;
	let show = false;
	export let src;
	const handleShow = () => {
		show = true;
	};

	const close = () => {
		show = false;
	};
</script>

<div class="{type === 'gallery' ? '' : 'group'} relative w-fit">
	<p
		class="rounded text-white group-hover:block hidden absolute -left-5 top-10 z-30 bg-slate-500 text-xs w-max px-2 py-1"
	>
		click to show
	</p>
	<img
		on:click={handleShow}
		{src}
		alt="..."
		class="cursor-pointer {type === 'gallery'
			? 'w-full h-full hover:scale-105'
			: 'w-12 h-12 rounded-full border-2 border-gray-50 shadow'}"
	/>
</div>

{#if show}
	<div class=" bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 ">
		<div
			transition:fly={{ y: 200, duration: 400 }}
			class="absolute bg-white w-screen left-0 top-0 h-screen z-50 max-w-lg sm:w-96 sm:h-fit sm:shadow-md sm:mb-10 sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 backdrop-blur-xl "
		>
			<div class="border-b flex justify-between font-bold p-5 ">
				<h2>Image</h2>
				<p class="cursor-pointer" on:click={close}>&#x2715</p>
			</div>
			<div class="p-5 ">
				<img {src} alt="" class="bg-black w-full h-full" />
			</div>
			{#if type === 'gallery'}
				<div class="mb-5 px-5">
					<button
						on:click={() => {
							close();
							showConfirm = true;
						}}
						class="rounded bg-red-500 text-white p-2  w-full">Delete</button
					>
				</div>
			{/if}
		</div>
	</div>
{/if}
