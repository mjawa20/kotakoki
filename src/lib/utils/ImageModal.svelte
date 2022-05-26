<script>
	import { fly } from 'svelte/transition';

	let show = false;
	const handleShow = () => {
		show = true;
	};

	const close = () => {
		show = false;
	};
</script>

<div class="relative">
	<p class="absolute -left-5 top-10 z-30 bg-slate-500">click to show</p>
	<img
		on:click={handleShow}
		src="/assets/img/a.jpg"
		alt="..."
		class="cursor-pointer w-12 h-12 rounded-full border-2 border-gray-50 shadow"
	/>
</div>

{#if show}
	<div class=" bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 ">
		<div
			transition:fly={{ y: 200, duration: 400 }}
			class="absolute bg-white w-screen left-0 top-0 h-screen z-50 max-w-lg sm:w-96 sm:h-fit sm:shadow-md sm:mb-10 sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 backdrop-blur-xl "
		>
			<div class="border-b flex justify-between font-bold p-5 ">
				<h2>Image List</h2>
				<p class="cursor-pointer" on:click={close}>&#x2715</p>
			</div>
		</div>
	</div>
{/if}
