<script>
	import { slide } from 'svelte/transition';

	export let isShow;
	export let res;
</script>

{#if isShow || isShow == undefined}
	<div
		transition:slide
		class="{res
			? 'lg:hidden block'
			: 'lg:block hidden'} w-full lg:w-4/5 border-l bg-zinc-50 lg:pl-10 py-10 lg:pt-14"
	>
		<div class="max-w-md mx-auto lg:max-w-sm lg:mr-auto lg:mx-0">
			<div class="flex justify-between items-center mb-5 text-sm font-medium">
				<div class="inline-flex space-x-4 items-center">
					<div class="relative w-fit ">
						<img src="/assets/img/a.jpg" alt="" class="w-16 rounded-md" />
						<p
							class="-top-2 -right-1 text-xs font-bold absolute bg-gray-600 rounded-full flex items-center justify-center h-5 w-5 text-center text-white"
						>
							1
						</p>
					</div>
					<p>Es jeruk kayak akan mineral</p>
				</div>
				<p>¥ 300</p>
			</div>
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
					<p>¥ 1,100</p>
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
				<p class="text-base">JPY 1,100 ￥ 1,100</p>
			</div>
		</div>
	</div>
{/if}
