<script>
	import { onMount } from 'svelte';

	import { slide } from 'svelte/transition';
	import Item from './Item.svelte';

	export let isShow;
	export let total = 0;
	export let res;
	export let items = [];
</script>

{#if isShow || isShow == undefined}
	<div
		transition:slide
		class="{res
			? 'lg:hidden block'
			: 'lg:block hidden'} w-full lg:w-10/12 border-l bg-zinc-50 lg:pl-10 py-10 lg:pt-14"
	>
		<div class="max-w-md mx-auto lg:max-w-sm lg:mr-auto lg:mx-0">
			{#if items.length}
				{#each items as item}
					<Item {item} />
				{/each}
			{:else}
				<div class="flex justify-between items-center mb-5 ">
					<div class="inline-flex space-x-4 items-center">
						<div class="rounded bg-slate-300 h-16 w-16" />
						<div class="rounded bg-slate-300 h-5 w-20" />
					</div>
					<div class="rounded bg-slate-300 h-5 w-20" />
				</div>
			{/if}
			<hr />
			<div class="my-5 flex space-x-3">
				<input
					type="text"
					placeholder="Coupon Code"
					class=" w-full placeholder:text-gray-500 rounded p-2 border"
				/>
				<button class="w-fit bg-orange-600 px-5 p-2 text-sm text-white rounded">Apply</button>
			</div>
			<hr />
			<div class="my-5 text-xs font-medium ">
				<div class="flex justify-between items-center mb-3">
					<p>Subtotal</p>
					<p>¥ {total}</p>
				</div>
				<div class="flex justify-between items-center">
					<p>Delivery</p>
					<p>Calculated in the next step</p>
				</div>
			</div>
			<hr />
			<div class="mt-5 flex justify-between items-center text-sm font-medium">
				<div>
					<p>Total</p>
					<p class="text-sm font-normal">Includes ¥ 81 tax</p>
				</div>
				<p class="text-base">JPY ￥ {total}</p>
			</div>
		</div>
	</div>
{/if}
