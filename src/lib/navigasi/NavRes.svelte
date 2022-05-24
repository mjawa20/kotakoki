<script>
	import { slide } from 'svelte/transition';
	export let isShow;
</script>

{#if isShow}
	<div transition:slide class=" mt-3 flex flex-col text-xs text-amber-900  font-semibold">
		<a href="/" class="border-t px-8 py-4">HOME</a>
		<a href="/collections" class="border-t px-8 py-4">PRODUCT</a>
		<a href="/our-story" class="border-t px-8 py-4">WHAT IS KOTAKOKI?</a>
		<a href="/english" class="border-t px-8 py-4">ENG</a>
		<a href="/login" class="border-t px-8 py-4">LOGIN</a>
		<a href="/register" class="border-t px-8 py-4">CREATE AN ACCOUNT</a>
		<label class="relative block px-8 py-4 border-t">
			<span class="absolute inset-y-0 left-9 flex items-center pl-2">
				<i class="fas fa-search text-gray-600" />
			</span>
			<input
				class=" placeholder:text-slate-400 block bg-white w-full border rounded-md py-1 pl-9 pr-3 shadow-sm  text-xs"
				placeholder="Search"
				type="text"
				name="search for"
			/>
		</label>
	</div>
{/if}
