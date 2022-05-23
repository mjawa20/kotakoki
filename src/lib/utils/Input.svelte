<script>
	export let name;
	export let placeholder;
    export let style = 'mb-5';
</script>

<label class="block w-full {style}">
	{#if name}
		<span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium">
			{name}
		</span>
	{/if}
	<input
		type="text"
		class="mt-1 px-3 py-2 bg-white border border-slate-300 block w-full rounded-md sm:text-sm  "
        placeholder={placeholder ? placeholder:""}
	/>
</label>
