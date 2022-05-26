<script>
	import { fly } from 'svelte/transition';

	export let type;
	export let show = false;
	export let message;

	
</script>

{#if show}
	<div
		transition:fly
		class="w-96 bottom-10 right-10 text-white px-6 py-4 border-0 rounded fixed z-10 mb-4 {type ==
		'error'
			? 'bg-red-500'
			: 'bg-green-600'}"
	>
		<span class="text-xl inline-block mr-5 align-middle">
			<i class="fas fa-bell" />
		</span>
		<span class="inline-block align-middle mr-8">
			{message}
		</span>
		<button
			class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
		>
			<span>×</span>
		</button>
	</div>
{/if}
